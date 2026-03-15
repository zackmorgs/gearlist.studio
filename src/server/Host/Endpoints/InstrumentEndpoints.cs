using Data;
using Models;
using MongoDB.Driver;

namespace Host.Endpoints;

public static class InstrumentEndpoints
{
    public static void MapInstrumentEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("/api/instruments");

        group.MapGet("/", async (Db db, CancellationToken ct) =>
        {
            var instruments = await db.Instruments.Find(_ => true).ToListAsync(ct);
            return Results.Ok(instruments);
        });

        group.MapGet("/{id:guid}", async (Guid id, Db db, CancellationToken ct) =>
        {
            var instrument = await db.Instruments.Find(i => i.Id == id).FirstOrDefaultAsync(ct);
            return instrument is null ? Results.NotFound() : Results.Ok(instrument);
        });

        group.MapGet("/slug/{slug}", async (string slug, Db db, CancellationToken ct) =>
        {
            var instrument = await db.Instruments.Find(i => i.Slug.Value == slug).FirstOrDefaultAsync(ct);
            return instrument is null ? Results.NotFound() : Results.Ok(instrument);
        });

        group.MapPost("/", async (Instrument instrument, Db db, CancellationToken ct) =>
        {
            instrument.Id = Guid.NewGuid();
            instrument.CreatedAtUtc = DateTime.UtcNow;
            instrument.UpdatedAtUtc = DateTime.UtcNow;
            await db.Instruments.InsertOneAsync(instrument, cancellationToken: ct);
            return Results.Created($"/api/instruments/{instrument.Id}", instrument);
        });

        group.MapPut("/{id:guid}", async (Guid id, Instrument updated, Db db, CancellationToken ct) =>
        {
            var existing = await db.Instruments.Find(i => i.Id == id).FirstOrDefaultAsync(ct);
            if (existing is null) return Results.NotFound();

            updated.Id = id;
            updated.CreatedAtUtc = existing.CreatedAtUtc;
            updated.UpdatedAtUtc = DateTime.UtcNow;

            await db.Instruments.ReplaceOneAsync(i => i.Id == id, updated, cancellationToken: ct);
            return Results.Ok(updated);
        });

        group.MapDelete("/{id:guid}", async (Guid id, Db db, CancellationToken ct) =>
        {
            var result = await db.Instruments.DeleteOneAsync(i => i.Id == id, ct);
            return result.DeletedCount == 0 ? Results.NotFound() : Results.NoContent();
        });
    }
}
