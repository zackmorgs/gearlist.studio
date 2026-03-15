using Data;
using Models;
using MongoDB.Driver;

namespace Host.Endpoints;

public static class PluginEndpoints
{
    public static void MapPluginEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("/api/plugins");

        group.MapGet("/", async (Db db, CancellationToken ct) =>
        {
            var plugins = await db.Plugins.Find(_ => true).ToListAsync(ct);
            return Results.Ok(plugins);
        });

        group.MapGet("/{id:guid}", async (Guid id, Db db, CancellationToken ct) =>
        {
            var plugin = await db.Plugins.Find(p => p.Id == id).FirstOrDefaultAsync(ct);
            return plugin is null ? Results.NotFound() : Results.Ok(plugin);
        });

        group.MapGet("/slug/{slug}", async (string slug, Db db, CancellationToken ct) =>
        {
            var plugin = await db.Plugins.Find(p => p.Slug.Value == slug).FirstOrDefaultAsync(ct);
            return plugin is null ? Results.NotFound() : Results.Ok(plugin);
        });

        group.MapPost("/", async (Plugin plugin, Db db, CancellationToken ct) =>
        {
            plugin.Id = Guid.NewGuid();
            plugin.CreatedAtUtc = DateTime.UtcNow;
            plugin.UpdatedAtUtc = DateTime.UtcNow;
            await db.Plugins.InsertOneAsync(plugin, cancellationToken: ct);
            return Results.Created($"/api/plugins/{plugin.Id}", plugin);
        });

        group.MapPut("/{id:guid}", async (Guid id, Plugin updated, Db db, CancellationToken ct) =>
        {
            var existing = await db.Plugins.Find(p => p.Id == id).FirstOrDefaultAsync(ct);
            if (existing is null) return Results.NotFound();

            updated.Id = id;
            updated.CreatedAtUtc = existing.CreatedAtUtc;
            updated.UpdatedAtUtc = DateTime.UtcNow;

            await db.Plugins.ReplaceOneAsync(p => p.Id == id, updated, cancellationToken: ct);
            return Results.Ok(updated);
        });

        group.MapDelete("/{id:guid}", async (Guid id, Db db, CancellationToken ct) =>
        {
            var result = await db.Plugins.DeleteOneAsync(p => p.Id == id, ct);
            return result.DeletedCount == 0 ? Results.NotFound() : Results.NoContent();
        });

        group.MapGet("/four-random", async (Db db, CancellationToken ct) =>
        {
            var plugins = await db.Plugins.Aggregate()
                .Sample(4)
                .ToListAsync(ct);
            return Results.Ok(plugins);
        });
    }
}
