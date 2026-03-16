using Data;
using Models;
using MongoDB.Driver;

namespace Host.Endpoints;

public static class BandsEndpoint
{
    public static void MapBandEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("/api/bands");

        group.MapGet("/", async (Db db, CancellationToken ct) =>
        {
            var bands = await db.Bands.Find(_ => true).ToListAsync(ct);
            return Results.Ok(bands);
        });

        group.MapGet("/{slug}", async (string slug, Db db, CancellationToken ct) =>
        {
            var band = await db.Bands.Find(b => b.Slug.Value == slug).FirstOrDefaultAsync(ct);
            return band is null ? Results.NotFound() : Results.Ok(band);
        });

        group.MapGet("/genre/{slug}", async (string slug, Db db, CancellationToken ct) =>
        {
            var filter = Builders<Band>.Filter.AnyEq(b => b.GenreTags, slug);
            var bands = await db.Bands.Find(filter).ToListAsync(ct);
            return bands.Count == 0 ? Results.NotFound() : Results.Ok(bands);
        });

        group.MapPost("/", async (Band band, Db db, CancellationToken ct) =>
        {
            band.Id = Guid.NewGuid();
            band.CreatedAtUtc = DateTime.UtcNow;
            band.UpdatedAtUtc = DateTime.UtcNow;
            await db.Bands.InsertOneAsync(band, cancellationToken: ct);
            return Results.Created($"/api/bands/{band.Id}", band);
        });

        group.MapPut("/{id:guid}", async (Guid id, Band updated, Db db, CancellationToken ct) =>
        {
            var existing = await db.Bands.Find(b => b.Id == id).FirstOrDefaultAsync(ct);
            if (existing is null) return Results.NotFound();

            updated.Id = id;
            updated.CreatedAtUtc = existing.CreatedAtUtc;
            updated.UpdatedAtUtc = DateTime.UtcNow;

            await db.Bands.ReplaceOneAsync(b => b.Id == id, updated, cancellationToken: ct);
            return Results.Ok(updated);
        });

        group.MapDelete("/{id:guid}", async (Guid id, Db db, CancellationToken ct) =>
        {
            var result = await db.Bands.DeleteOneAsync(b => b.Id == id, ct);
            return result.DeletedCount == 0 ? Results.NotFound() : Results.NoContent();
        });

        group.MapGet("/four-random", async (Db db, CancellationToken ct) =>
        {
            var bands = await db.Bands.Aggregate()
                .Sample(4)
                .ToListAsync(ct);
            return Results.Ok(bands);
        });
    }
}
