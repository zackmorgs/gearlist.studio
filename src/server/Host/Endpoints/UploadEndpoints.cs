namespace Host.Endpoints;

public static class UploadEndpoints
{
    private static readonly string[] AllowedExtensions = [".jpg", ".jpeg", ".png", ".webp", ".gif"];
    private const long MaxFileSizeBytes = 5 * 1024 * 1024; // 5 MB

    public static void MapUploadEndpoints(this WebApplication app)
    {
        app.MapPost("/api/upload", async (IFormFile file, IWebHostEnvironment env) =>
        {
            if (file is null || file.Length == 0)
                return Results.BadRequest("No file provided.");

            if (file.Length > MaxFileSizeBytes)
                return Results.BadRequest("File exceeds 5 MB limit.");

            var ext = Path.GetExtension(file.FileName).ToLowerInvariant();
            if (!AllowedExtensions.Contains(ext))
                return Results.BadRequest($"File type '{ext}' is not allowed.");

            var uploadsDir = Path.Combine(env.WebRootPath, "uploads");
            Directory.CreateDirectory(uploadsDir);

            var fileName = $"{Guid.NewGuid()}{ext}";
            var filePath = Path.Combine(uploadsDir, fileName);

            await using var stream = File.Create(filePath);
            await file.CopyToAsync(stream);

            return Results.Ok(new { url = $"/uploads/{fileName}" });
        })
        .DisableAntiforgery();
    }
}
