using Data;
using Models;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Host.Endpoints;

public static class EquipmentEndpoints
{
    public static void MapEquipmentEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("/api/equipment");

        group.MapPost("/batch", async (Guid[] ids, Db db, CancellationToken ct) =>
        {
            if (ids is null || ids.Length == 0)
                return Results.Ok(Array.Empty<object>());

            var idSet = ids.ToHashSet();

            var ampsTask = db.Amps.Find(a => idSet.Contains(a.Id)).ToListAsync(ct);
            var cabsTask = db.Cabs.Find(c => idSet.Contains(c.Id)).ToListAsync(ct);
            var pedalsTask = db.Pedals.Find(p => idSet.Contains(p.Id)).ToListAsync(ct);
            var pluginsTask = db.Plugins.Find(p => idSet.Contains(p.Id)).ToListAsync(ct);
            var instrumentsTask = db.Instruments.Find(i => idSet.Contains(i.Id)).ToListAsync(ct);

            await Task.WhenAll(ampsTask, cabsTask, pedalsTask, pluginsTask, instrumentsTask);

            var results = new List<object>();
            results.AddRange(ampsTask.Result.Select(a => new { a.Id, a.DisplayName, a.ImageUrl, Type = "amp" }));
            results.AddRange(cabsTask.Result.Select(c => new { c.Id, c.DisplayName, c.ImageUrl, Type = "cab" }));
            results.AddRange(pedalsTask.Result.Select(p => new { p.Id, p.DisplayName, p.ImageUrl, Type = "pedal" }));
            results.AddRange(pluginsTask.Result.Select(p => new { p.Id, p.DisplayName, p.ImageUrl, Type = "plugin" }));
            results.AddRange(instrumentsTask.Result.Select(i => new { i.Id, i.DisplayName, i.ImageUrl, Type = "instrument" }));

            return Results.Ok(results);
        });

        group.MapGet("/{id:guid}", async (Guid id, Db db, CancellationToken ct) =>
        {
            var ampTask = db.Amps.Find(a => a.Id == id).FirstOrDefaultAsync(ct);
            var cabTask = db.Cabs.Find(c => c.Id == id).FirstOrDefaultAsync(ct);
            var pedalTask = db.Pedals.Find(p => p.Id == id).FirstOrDefaultAsync(ct);
            var pluginTask = db.Plugins.Find(p => p.Id == id).FirstOrDefaultAsync(ct);
            var instrumentTask = db.Instruments.Find(i => i.Id == id).FirstOrDefaultAsync(ct);

            await Task.WhenAll(ampTask, cabTask, pedalTask, pluginTask, instrumentTask);

            if (ampTask.Result is { } amp) return Results.Ok(new { amp.Id, amp.DisplayName, amp.ImageUrl, Type = "amp" });
            if (cabTask.Result is { } cab) return Results.Ok(new { cab.Id, cab.DisplayName, cab.ImageUrl, Type = "cab" });
            if (pedalTask.Result is { } pedal) return Results.Ok(new { pedal.Id, pedal.DisplayName, pedal.ImageUrl, Type = "pedal" });
            if (pluginTask.Result is { } plugin) return Results.Ok(new { plugin.Id, plugin.DisplayName, plugin.ImageUrl, Type = "plugin" });
            if (instrumentTask.Result is { } instrument) return Results.Ok(new { instrument.Id, instrument.DisplayName, instrument.ImageUrl, Type = "instrument" });

            return Results.NotFound();
        });

        group.MapGet("/search", async (string? q, Db db, CancellationToken ct) =>
        {
            if (string.IsNullOrWhiteSpace(q))
                return Results.Ok(Array.Empty<object>());

            var regex = new BsonRegularExpression(q.Trim(), "i");

            var ampsTask = db.Amps.Find(Builders<Amp>.Filter.Regex(a => a.DisplayName, regex)).Limit(10).ToListAsync(ct);
            var cabsTask = db.Cabs.Find(Builders<Cab>.Filter.Regex(c => c.DisplayName, regex)).Limit(10).ToListAsync(ct);
            var pedalsTask = db.Pedals.Find(Builders<Pedal>.Filter.Regex(p => p.DisplayName, regex)).Limit(10).ToListAsync(ct);
            var pluginsTask = db.Plugins.Find(Builders<Plugin>.Filter.Regex(p => p.DisplayName, regex)).Limit(10).ToListAsync(ct);
            var instrumentsTask = db.Instruments.Find(Builders<Instrument>.Filter.Regex(i => i.DisplayName, regex)).Limit(10).ToListAsync(ct);

            await Task.WhenAll(ampsTask, cabsTask, pedalsTask, pluginsTask, instrumentsTask);

            var results = new List<object>();
            results.AddRange(ampsTask.Result.Select(a => new { a.Id, a.DisplayName, a.ImageUrl, Type = "amp" }));
            results.AddRange(cabsTask.Result.Select(c => new { c.Id, c.DisplayName, c.ImageUrl, Type = "cab" }));
            results.AddRange(pedalsTask.Result.Select(p => new { p.Id, p.DisplayName, p.ImageUrl, Type = "pedal" }));
            results.AddRange(pluginsTask.Result.Select(p => new { p.Id, p.DisplayName, p.ImageUrl, Type = "plugin" }));
            results.AddRange(instrumentsTask.Result.Select(i => new { i.Id, i.DisplayName, i.ImageUrl, Type = "instrument" }));

            return Results.Ok(results);
        });
    }
}
