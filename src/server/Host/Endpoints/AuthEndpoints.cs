using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Data;
using Models;
using Models.Dto;
using Services;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Driver;
using Microsoft.AspNetCore.Http.HttpResults;

namespace Host.Endpoints;

public static class AuthEndpoints
{
    public static Db? Db { get; }

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

        app.MapPost("/api/auth/login", async (LoginRequest request, Db db, IOptions<JwtSettings> jwtOptions) =>
        {
            var normalizedEmail = request.Email.Trim().ToLowerInvariant();
            var user = await db.Users.Find(u => u.Email == normalizedEmail).FirstOrDefaultAsync();

            if (user is null || !BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
            {
                return Results.Unauthorized();
            }

            var jwt = jwtOptions.Value;

            var claims = new List<Claim>
            {
                new(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                new(JwtRegisteredClaimNames.Email, user.Email),
                new("name", user.DisplayName)
            };

            var credentials = new SigningCredentials(
                new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwt.Secret)),
                SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: jwt.Issuer,
                audience: jwt.Audience,
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(jwt.ExpiryMinutes),
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

        _ = app.MapGet("/api/auth/me", async (ClaimsPrincipal principal, Db db) =>
        {
            var email = principal.FindFirstValue(JwtRegisteredClaimNames.Email);

            List<Claim> claims = principal.Claims.ToList();

            claims.ForEach(c => Console.WriteLine($"Claim: {c.Type} = {c.Value}"));

            // var nameIdentifier = claims.FirstOrDefault(c => c.Type == JwtRegisteredClaimNames.NameIdentifier)?.Value;
            var nameIdentifier = claims[0].Value; // gives name identifier

            // Console.WriteLine("JTI: " + nameIdentifier);

            if (nameIdentifier is null)
                return Results.Unauthorized();

            // if (!Guid.TryParse(jti, out var userId))
            //     return Results.Unauthorized();

            if (!Guid.TryParse(nameIdentifier, out var userId))
                return Results.Unauthorized();

            var user = await db.Users.Find(u => u.Id == userId).FirstOrDefaultAsync();

            // if (user is null)
            //     return Results.NotFound();

            return Results.Ok(new
            {
                user.Id,
                user.DisplayName,
                user.Email,
                user.ProfileImageUrl,
                user.Slug,
                user.CreatedAtUtc
            });
        }).RequireAuthorization();
    }
}