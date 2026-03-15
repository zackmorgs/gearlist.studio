using Data;
using Models;
using MongoDB.Driver;

namespace Host.Endpoints;

public static class GenreEndpoints
{
    public static void MapGenreEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("/api/genres");

        group.MapGet("/", async (Db db, CancellationToken ct) =>
        {
            var genres = await db.Genres.Find(_ => true).ToListAsync(ct);
            return Results.Ok(genres);
        });

        group.MapGet("/{id:guid}", async (Guid id, Db db, CancellationToken ct) =>
        {
            var genre = await db.Genres.Find(g => g.Id == id).FirstOrDefaultAsync(ct);
            return genre is null ? Results.NotFound() : Results.Ok(genre);
        });

        group.MapGet("/slug/{slug}", async (string slug, Db db, CancellationToken ct) =>
        {
            var genre = await db.Genres.Find(g => g.Slug.Value == slug).FirstOrDefaultAsync(ct);
            return genre is null ? Results.NotFound() : Results.Ok(genre);
        });

        group.MapPost("/", async (Genre genre, Db db, CancellationToken ct) =>
        {
            genre.Id = Guid.NewGuid();
            genre.CreatedAtUtc = DateTime.UtcNow;
            genre.UpdatedAtUtc = DateTime.UtcNow;
            await db.Genres.InsertOneAsync(genre, cancellationToken: ct);
            return Results.Created($"/api/genres/{genre.Id}", genre);
        });

        group.MapPut("/{id:guid}", async (Guid id, Genre updated, Db db, CancellationToken ct) =>
        {
            var existing = await db.Genres.Find(g => g.Id == id).FirstOrDefaultAsync(ct);
            if (existing is null) return Results.NotFound();

            updated.Id = id;
            updated.CreatedAtUtc = existing.CreatedAtUtc;
            updated.UpdatedAtUtc = DateTime.UtcNow;

            await db.Genres.ReplaceOneAsync(g => g.Id == id, updated, cancellationToken: ct);
            return Results.Ok(updated);
        });

        group.MapDelete("/{id:guid}", async (Guid id, Db db, CancellationToken ct) =>
        {
            var result = await db.Genres.DeleteOneAsync(g => g.Id == id, ct);
            return result.DeletedCount == 0 ? Results.NotFound() : Results.NoContent();
        });
    }
}
