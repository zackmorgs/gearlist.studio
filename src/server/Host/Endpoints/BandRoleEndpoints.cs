using Data;
using Models;
using MongoDB.Driver;

namespace Host.Endpoints;

public static class BandRoleEndpoints
{
    public static void MapBandRoleEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("/api/bandroles");

        group.MapGet("/", async (Db db, CancellationToken ct) =>
        {
            var roles = await db.BandRoles.Find(_ => true).ToListAsync(ct);
            return Results.Ok(roles);
        });

        group.MapGet("/{id:guid}", async (Guid id, Db db, CancellationToken ct) =>
        {
            var role = await db.BandRoles.Find(r => r.Id == id).FirstOrDefaultAsync(ct);
            return role is null ? Results.NotFound() : Results.Ok(role);
        });

        group.MapGet("/slug/{slug}", async (string slug, Db db, CancellationToken ct) =>
        {
            var role = await db.BandRoles.Find(r => r.Slug.Value == slug).FirstOrDefaultAsync(ct);
            return role is null ? Results.NotFound() : Results.Ok(role);
        });

        group.MapPost("/", async (BandRole role, Db db, CancellationToken ct) =>
        {
            role.Id = Guid.NewGuid();
            role.CreatedAtUtc = DateTime.UtcNow;
            role.UpdatedAtUtc = DateTime.UtcNow;
            await db.BandRoles.InsertOneAsync(role, cancellationToken: ct);
            return Results.Created($"/api/bandroles/{role.Id}", role);
        });

        group.MapPut("/{id:guid}", async (Guid id, BandRole updated, Db db, CancellationToken ct) =>
        {
            var existing = await db.BandRoles.Find(r => r.Id == id).FirstOrDefaultAsync(ct);
            if (existing is null) return Results.NotFound();

            updated.Id = id;
            updated.CreatedAtUtc = existing.CreatedAtUtc;
            updated.UpdatedAtUtc = DateTime.UtcNow;

            await db.BandRoles.ReplaceOneAsync(r => r.Id == id, updated, cancellationToken: ct);
            return Results.Ok(updated);
        });

        group.MapDelete("/{id:guid}", async (Guid id, Db db, CancellationToken ct) =>
        {
            var result = await db.BandRoles.DeleteOneAsync(r => r.Id == id, ct);
            return result.DeletedCount == 0 ? Results.NotFound() : Results.NoContent();
        });
    }
}
