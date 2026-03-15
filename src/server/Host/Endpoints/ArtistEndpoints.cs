using Data;
using Models;
using MongoDB.Driver;

namespace Host.Endpoints;

public static class ArtistEndpoints
{
    public static void MapArtistEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("/api/artists");

        group.MapGet("/", async (Db db, CancellationToken ct) =>
        {
            var artists = await db.Artists.Find(_ => true).ToListAsync(ct);
            return Results.Ok(artists);
        });

        group.MapGet("/{id:guid}", async (Guid id, Db db, CancellationToken ct) =>
        {
            var artist = await db.Artists.Find(a => a.Id == id).FirstOrDefaultAsync(ct);
            return artist is null ? Results.NotFound() : Results.Ok(artist);
        });

        group.MapGet("/slug/{slug}", async (string slug, Db db, CancellationToken ct) =>
        {
            var artist = await db.Artists.Find(a => a.Slug.Value == slug).FirstOrDefaultAsync(ct);
            return artist is null ? Results.NotFound() : Results.Ok(artist);
        });

        group.MapPost("/", async (Artist artist, Db db, CancellationToken ct) =>
        {
            artist.Id = Guid.NewGuid();
            artist.CreatedAtUtc = DateTime.UtcNow;
            artist.UpdatedAtUtc = DateTime.UtcNow;
            await db.Artists.InsertOneAsync(artist, cancellationToken: ct);
            return Results.Created($"/api/artists/{artist.Id}", artist);
        });

        group.MapPut("/{id:guid}", async (Guid id, Artist updated, Db db, CancellationToken ct) =>
        {
            var existing = await db.Artists.Find(a => a.Id == id).FirstOrDefaultAsync(ct);
            if (existing is null) return Results.NotFound();

            updated.Id = id;
            updated.CreatedAtUtc = existing.CreatedAtUtc;
            updated.UpdatedAtUtc = DateTime.UtcNow;

            await db.Artists.ReplaceOneAsync(a => a.Id == id, updated, cancellationToken: ct);
            return Results.Ok(updated);
        });

        group.MapDelete("/{id:guid}", async (Guid id, Db db, CancellationToken ct) =>
        {
            var result = await db.Artists.DeleteOneAsync(a => a.Id == id, ct);
            return result.DeletedCount == 0 ? Results.NotFound() : Results.NoContent();
        });

        group.MapGet("/genre/{slug}", async (string slug, Db db, CancellationToken ct) =>
        {
            var filter = Builders<Artist>.Filter.Or(
                Builders<Artist>.Filter.Eq("GenreSlug", slug),
                Builders<Artist>.Filter.Eq("genreSlug", slug)
            );

            var artists = await db.Artists.Find(filter).ToListAsync(ct);
            return artists.Count == 0 ? Results.NotFound() : Results.Ok(artists);
        });
    }
}
