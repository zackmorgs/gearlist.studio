using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using BCrypt.Net;
using Data;
using Models;
using Models.Dto;
using Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Driver;
using Data.Mongo;
using Data.BandRoles;
using Data.Seed;
using Microsoft.Extensions.Options;
using Api.Endpoints;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();
builder.Services.Configure<MongoDbSettings>(builder.Configuration.GetSection("MongoDb"));
builder.Services.AddSingleton<Db>();
builder.Services.AddSingleton<IMongoClient>(sp =>
{
    var settings = sp.GetRequiredService<IOptions<MongoDbSettings>>().Value;
    return new MongoClient(settings.ConnectionString);
});

builder.Services.AddSingleton(sp =>
{
    var settings = sp.GetRequiredService<IOptions<MongoDbSettings>>().Value;
    var client = sp.GetRequiredService<IMongoClient>();
    return client.GetDatabase(settings.DatabaseName);
});

builder.Services.AddSingleton<IBandRoleRepository, BandRoleRepository>();

builder.Services.Configure<JwtSettings>(builder.Configuration.GetSection("Jwt"));
builder.Services.AddScoped<AuthService>();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        var jwt = builder.Configuration.GetSection("Jwt").Get<JwtSettings>()!;
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = jwt.Issuer,
            ValidAudience = jwt.Audience,
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(jwt.Secret))
        };
    });

builder.Services.AddAuthorization();

builder.Services.AddLettuceEncrypt();
builder.WebHost.UseKestrel(kestrelOptions =>
{
    kestrelOptions.ListenAnyIP(8080);
    kestrelOptions.ListenAnyIP(8443, listenOptions => listenOptions.UseHttps());
});

builder.Services.AddSingleton<ISlugService, SlugService>();

var app = builder.Build();

var mongoDb = app.Services.GetRequiredService<Db>();
await mongoDb.EnsureIndexesAsync();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.MapAuthEndpoints();

app.MapGet("/api/health", () => Results.Ok(new { status = "ok" }));


app.MapPost("/api/auth/register", async (RegisterRequest request, Db db) =>
{
    var normalizedEmail = request.Email.Trim().ToLowerInvariant();

    var user = new User
    {
        DisplayName = request.DisplayName.Trim(),
        Email = normalizedEmail,
        PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password)
    };

    try
    {
        await db.Users.InsertOneAsync(user);
    }
    catch (MongoWriteException ex) when (ex.WriteError?.Code == 11000)
    {
        return Results.Conflict(new { message = "Email is already in use." });
    }

    return Results.Created($"/api/users/{user.Id}", new
    {
        user.Id,
        user.DisplayName,
        user.Email
    });
});

app.MapPost("/api/auth/login", async (LoginRequest request, Db db, IConfiguration config) =>
{
    var normalizedEmail = request.Email.Trim().ToLowerInvariant();
    var user = await db.Users.Find(u => u.Email == normalizedEmail).FirstOrDefaultAsync();

    if (user is null || !BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
    {
        return Results.Unauthorized();
    }

    var jwtConfig = config.GetSection("Jwt");
    var key = jwtConfig["Key"] ?? throw new InvalidOperationException("Jwt:Key is not configured.");
    var issuer = jwtConfig["Issuer"] ?? throw new InvalidOperationException("Jwt:Issuer is not configured.");
    var audience = jwtConfig["Audience"] ?? throw new InvalidOperationException("Jwt:Audience is not configured.");
    var expiresMinutes = int.TryParse(jwtConfig["ExpiresMinutes"], out var parsed) ? parsed : 60;

    var claims = new List<Claim>
    {
        new(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
        new(JwtRegisteredClaimNames.Email, user.Email),
        new("name", user.DisplayName)
    };

    var credentials = new SigningCredentials(
        new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key)),
        SecurityAlgorithms.HmacSha256);

    var token = new JwtSecurityToken(
        issuer: issuer,
        audience: audience,
        claims: claims,
        expires: DateTime.UtcNow.AddMinutes(expiresMinutes),
        signingCredentials: credentials);

    return Results.Ok(new
    {
        token = new JwtSecurityTokenHandler().WriteToken(token),
        user = new
        {
            user.Id,
            user.DisplayName,
            user.Email
        }
    });
});

app.MapGet("/api/me", (ClaimsPrincipal principal) =>
{
    var id = principal.FindFirstValue(JwtRegisteredClaimNames.Sub);
    var email = principal.FindFirstValue(JwtRegisteredClaimNames.Email);
    var name = principal.FindFirstValue("name");

    return Results.Ok(new { id, email, name });
}).RequireAuthorization();

// after app is built, before app.Run()
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<IMongoDatabase>();
    var seeder = new DatabaseSeeder(db);
    await seeder.SeedAllAsync();
}

app.Run();
