using Services;

namespace Api.Endpoints;

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
    }
}