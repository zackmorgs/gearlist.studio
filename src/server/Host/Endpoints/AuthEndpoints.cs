using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Data;
using Models;
using Models.Dto;
using Services;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Driver;

namespace Host.Endpoints;

public static class AuthEndpoints
{
    public static void MapAuthEndpoints(this WebApplication app)
    {
        app.MapPost("/api/auth/google", async (GoogleAuthRequest request, AuthService authService, CancellationToken ct) =>
        {
            try
            {
                var result = await authService.AuthenticateWithGoogleAsync(request.IdToken, ct);
                return Results.Ok(result);
            }
            catch (Exception)
            {
                return Results.Unauthorized();
            }
        });

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
    }
}