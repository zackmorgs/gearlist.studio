using Data;
using Models;
using MongoDB.Driver;

namespace Host.Endpoints;

public static class CabEndpoints
{
    public static void MapCabEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("/api/cabs");

        group.MapGet("/", async (Db db, CancellationToken ct) =>
        {
            var cabs = await db.Cabs.Find(_ => true).ToListAsync(ct);
            return Results.Ok(cabs);
        });

        group.MapGet("/{id:guid}", async (Guid id, Db db, CancellationToken ct) =>
        {
            var cab = await db.Cabs.Find(c => c.Id == id).FirstOrDefaultAsync(ct);
            return cab is null ? Results.NotFound() : Results.Ok(cab);
        });

        group.MapGet("/slug/{slug}", async (string slug, Db db, CancellationToken ct) =>
        {
            var cab = await db.Cabs.Find(c => c.Slug.Value == slug).FirstOrDefaultAsync(ct);
            return cab is null ? Results.NotFound() : Results.Ok(cab);
        });

        group.MapPost("/", async (Cab cab, Db db, CancellationToken ct) =>
        {
            cab.Id = Guid.NewGuid();
            cab.CreatedAtUtc = DateTime.UtcNow;
            cab.UpdatedAtUtc = DateTime.UtcNow;
            await db.Cabs.InsertOneAsync(cab, cancellationToken: ct);
            return Results.Created($"/api/cabs/{cab.Id}", cab);
        });

        group.MapPut("/{id:guid}", async (Guid id, Cab updated, Db db, CancellationToken ct) =>
        {
            var existing = await db.Cabs.Find(c => c.Id == id).FirstOrDefaultAsync(ct);
            if (existing is null) return Results.NotFound();

            updated.Id = id;
            updated.CreatedAtUtc = existing.CreatedAtUtc;
            updated.UpdatedAtUtc = DateTime.UtcNow;

            await db.Cabs.ReplaceOneAsync(c => c.Id == id, updated, cancellationToken: ct);
            return Results.Ok(updated);
        });

        group.MapDelete("/{id:guid}", async (Guid id, Db db, CancellationToken ct) =>
        {
            var result = await db.Cabs.DeleteOneAsync(c => c.Id == id, ct);
            return result.DeletedCount == 0 ? Results.NotFound() : Results.NoContent();
        });

        group.MapGet("/four-random", async (Db db, CancellationToken ct) =>
        {
            var cabs = await db.Cabs.Aggregate()
                .Sample(4)
                .ToListAsync(ct);
            return Results.Ok(cabs);
        });
    }
}
