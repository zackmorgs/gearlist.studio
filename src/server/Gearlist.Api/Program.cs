using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using BCrypt.Net;
using Gearlist.Api.Data;
using Gearlist.Api.Models;
using Gearlist.Api.Models.Dto;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        var jwtConfig = builder.Configuration.GetSection("Jwt");
        var key = jwtConfig["Key"] ?? throw new InvalidOperationException("Jwt:Key is not configured.");

        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateIssuerSigningKey = true,
            ValidateLifetime = true,
            ValidIssuer = jwtConfig["Issuer"],
            ValidAudience = jwtConfig["Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key))
        };
    });

builder.Services.AddAuthorization();

builder.Services.AddLettuceEncrypt();
builder.WebHost.UseKestrel(kestrelOptions =>
{
    kestrelOptions.ListenAnyIP(8080);
    kestrelOptions.ListenAnyIP(8443, listenOptions => listenOptions.UseHttps());
});

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.EnsureCreated();
}

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();

app.MapGet("/api/health", () => Results.Ok(new { status = "ok" }));

app.MapPost("/api/auth/register", async (RegisterRequest request, AppDbContext db) =>
{
    var normalizedEmail = request.Email.Trim().ToLowerInvariant();
    var exists = await db.Users.AnyAsync(u => u.Email == normalizedEmail);

    if (exists)
    {
        return Results.Conflict(new { message = "Email is already in use." });
    }

    var user = new User
    {
        DisplayName = request.DisplayName.Trim(),
        Email = normalizedEmail,
        PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password)
    };

    db.Users.Add(user);
    await db.SaveChangesAsync();

    return Results.Created($"/api/users/{user.Id}", new
    {
        user.Id,
        user.DisplayName,
        user.Email
    });
});

app.MapPost("/api/auth/login", async (LoginRequest request, AppDbContext db, IConfiguration config) =>
{
    var normalizedEmail = request.Email.Trim().ToLowerInvariant();
    var user = await db.Users.SingleOrDefaultAsync(u => u.Email == normalizedEmail);

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

app.Run();
