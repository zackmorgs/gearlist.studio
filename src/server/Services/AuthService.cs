using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Google.Apis.Auth;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Models;
using MongoDB.Driver;

namespace Services;

public record GoogleAuthRequest(string IdToken);
public record AuthResponse(string Token, User User);

public sealed class AuthService
{
    private readonly IMongoCollection<User> _users;
    private readonly JwtSettings _jwt;
    private readonly string _googleClientId;

    public AuthService(IMongoDatabase db, IOptions<JwtSettings> jwt, IConfiguration config)
    {
        _users = db.GetCollection<User>("users");
        _jwt = jwt.Value;
        _googleClientId = config["Google:ClientId"]!;
    }

    public async Task<AuthResponse> AuthenticateWithGoogleAsync(string idToken, CancellationToken ct = default)
    {
        // 1. Validate token with Google
        var payload = await GoogleJsonWebSignature.ValidateAsync(idToken, new GoogleJsonWebSignature.ValidationSettings
        {
            Audience = new[] { _googleClientId }
        });

        // 2. Find or create user
        var user = await _users.Find(x => x.GoogleId == payload.Subject).FirstOrDefaultAsync(ct);

        if (user is null)
        {
            user = new User
            {
                Email = payload.Email,
                DisplayName = payload.Name,
                GoogleId = payload.Subject,
                ProfileImageUrl = payload.Picture
            };
            await _users.InsertOneAsync(user, cancellationToken: ct);
        }

        // 3. Issue JWT
        var token = GenerateJwt(user);
        return new AuthResponse(token, user);
    }

    private string GenerateJwt(User user)
    {
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwt.Secret));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
            new Claim(JwtRegisteredClaimNames.Email, user.Email),
            new Claim(JwtRegisteredClaimNames.Name, user.DisplayName),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new Claim(ClaimTypes.Role, user.Role.ToString())
        };

        var token = new JwtSecurityToken(
            issuer: _jwt.Issuer,
            audience: _jwt.Audience,
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(_jwt.ExpiryMinutes),
            signingCredentials: creds);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}