using Data;
using Models;
using MongoDB.Driver;

namespace Host.Endpoints;

public static class PedalEndpoints
{
    public static void MapPedalEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("/api/pedals");

        group.MapGet("/", async (Db db, CancellationToken ct) =>
        {
            var pedals = await db.Pedals.Find(_ => true).ToListAsync(ct);
            return Results.Ok(pedals);
        });

        group.MapGet("/{id:guid}", async (Guid id, Db db, CancellationToken ct) =>
        {
            var pedal = await db.Pedals.Find(p => p.Id == id).FirstOrDefaultAsync(ct);
            return pedal is null ? Results.NotFound() : Results.Ok(pedal);
        });

        group.MapGet("/slug/{slug}", async (string slug, Db db, CancellationToken ct) =>
        {
            var pedal = await db.Pedals.Find(p => p.Slug.Value == slug).FirstOrDefaultAsync(ct);
            return pedal is null ? Results.NotFound() : Results.Ok(pedal);
        });

        group.MapPost("/", async (Pedal pedal, Db db, CancellationToken ct) =>
        {
            pedal.Id = Guid.NewGuid();
            pedal.CreatedAtUtc = DateTime.UtcNow;
            pedal.UpdatedAtUtc = DateTime.UtcNow;
            await db.Pedals.InsertOneAsync(pedal, cancellationToken: ct);
            return Results.Created($"/api/pedals/{pedal.Id}", pedal);
        });

        group.MapPut("/{id:guid}", async (Guid id, Pedal updated, Db db, CancellationToken ct) =>
        {
            var existing = await db.Pedals.Find(p => p.Id == id).FirstOrDefaultAsync(ct);
            if (existing is null) return Results.NotFound();

            updated.Id = id;
            updated.CreatedAtUtc = existing.CreatedAtUtc;
            updated.UpdatedAtUtc = DateTime.UtcNow;

            await db.Pedals.ReplaceOneAsync(p => p.Id == id, updated, cancellationToken: ct);
            return Results.Ok(updated);
        });

        group.MapDelete("/{id:guid}", async (Guid id, Db db, CancellationToken ct) =>
        {
            var result = await db.Pedals.DeleteOneAsync(p => p.Id == id, ct);
            return result.DeletedCount == 0 ? Results.NotFound() : Results.NoContent();
        });

        group.MapGet("/four-random", async (Db db, CancellationToken ct) =>
        {
            var pedals = await db.Pedals.Aggregate()
                .Sample(4)
                .ToListAsync(ct);
            return Results.Ok(pedals);
        });
    }
}
