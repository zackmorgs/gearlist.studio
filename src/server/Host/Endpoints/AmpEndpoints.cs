using Data;
using Models;
using MongoDB.Driver;

namespace Host.Endpoints;

public static class AmpEndpoints
{
    public static void MapAmpEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("/api/amps");

        group.MapGet("/", async (Db db, CancellationToken ct) =>
        {
            var amps = await db.Amps.Find(_ => true).ToListAsync(ct);
            return Results.Ok(amps);
        });

        group.MapGet("/{id:guid}", async (Guid id, Db db, CancellationToken ct) =>
        {
            var amp = await db.Amps.Find(a => a.Id == id).FirstOrDefaultAsync(ct);
            return amp is null ? Results.NotFound() : Results.Ok(amp);
        });

        group.MapGet("/slug/{slug}", async (string slug, Db db, CancellationToken ct) =>
        {
            var amp = await db.Amps.Find(a => a.Slug.Value == slug).FirstOrDefaultAsync(ct);
            return amp is null ? Results.NotFound() : Results.Ok(amp);
        });

        group.MapPost("/", async (Amp amp, Db db, CancellationToken ct) =>
        {
            amp.Id = Guid.NewGuid();
            amp.CreatedAtUtc = DateTime.UtcNow;
            amp.UpdatedAtUtc = DateTime.UtcNow;
            await db.Amps.InsertOneAsync(amp, cancellationToken: ct);
            return Results.Created($"/api/amps/{amp.Id}", amp);
        });

        group.MapPut("/{id:guid}", async (Guid id, Amp updated, Db db, CancellationToken ct) =>
        {
            var existing = await db.Amps.Find(a => a.Id == id).FirstOrDefaultAsync(ct);
            if (existing is null) return Results.NotFound();

            updated.Id = id;
            updated.CreatedAtUtc = existing.CreatedAtUtc;
            updated.UpdatedAtUtc = DateTime.UtcNow;

            await db.Amps.ReplaceOneAsync(a => a.Id == id, updated, cancellationToken: ct);
            return Results.Ok(updated);
        });

        group.MapDelete("/{id:guid}", async (Guid id, Db db, CancellationToken ct) =>
        {
            var result = await db.Amps.DeleteOneAsync(a => a.Id == id, ct);
            return result.DeletedCount == 0 ? Results.NotFound() : Results.NoContent();
        });
    }
}
