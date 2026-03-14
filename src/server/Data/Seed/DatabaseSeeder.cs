using System.Text.Json;
using Models;
using MongoDB.Driver;
using Slugify;

namespace Data.Seed;

public sealed class DatabaseSeeder
{
    private readonly IMongoDatabase _db;
    private readonly SlugHelper _slugHelper = new();

    private static readonly JsonSerializerOptions _jsonOptions = new()
    {
        PropertyNameCaseInsensitive = true
    };

    public DatabaseSeeder(IMongoDatabase db)
    {
        _db = db;
    }

    public async Task SeedAllAsync(CancellationToken ct = default)
    {
        await SeedBandRolesAsync(ct);
        await SeedGenresAsync(ct);
        await SeedInstrumentsAsync(ct);
    }

    private async Task SeedBandRolesAsync(CancellationToken ct)
    {
        var collection = _db.GetCollection<BandRole>("band_roles");
        var records = await LoadSeedFileAsync<BandRoleSeedRecord>("bandroles.seed.json");

        foreach (var record in records)
        {
            var slugValue = _slugHelper.GenerateSlug(record.DisplayName);

            // Skip if slug already exists
            var exists = await collection
                .Find(x => x.Slug.Value == slugValue)
                .AnyAsync(ct);

            if (exists) continue;

            var role = new BandRole
            {
                DisplayName = record.DisplayName,
                Description = record.Description,
                Slug = new Slug(slugValue)
            };

            await collection.InsertOneAsync(role, cancellationToken: ct);
        }
    }

    private async Task SeedGenresAsync(CancellationToken ct)
    {
        var collection = _db.GetCollection<Genre>("genres");
        var records = await LoadSeedFileAsync<GenreSeedRecord>("genres.seed.json");

        foreach (var record in records)
        {
            var slugValue = _slugHelper.GenerateSlug(record.DisplayName);

            var exists = await collection
                .Find(x => x.Slug.Value == slugValue)
                .AnyAsync(ct);

            if (exists) continue;

            var genre = new Genre
            {
                DisplayName = record.DisplayName,
                Slug = new Slug(slugValue)
            };

            await collection.InsertOneAsync(genre, cancellationToken: ct);
        }
    }

    private async Task SeedInstrumentsAsync(CancellationToken ct)
    {
        var collection = _db.GetCollection<Instrument>("instruments");
        var records = await LoadSeedFileAsync<InstrumentSeedRecord>("instruments.seed.json");

        foreach (var record in records)
        {
            var slugValue = _slugHelper.GenerateSlug(record.DisplayName);

            var exists = await collection
                .Find(x => x.Slug.Value == slugValue)
                .AnyAsync(ct);

            if (exists) continue;

            var instrument = new Instrument
            {
                DisplayName = record.DisplayName,
                InstrumentType = record.InstrumentType,
                Slug = new Slug(slugValue)
            };

            await collection.InsertOneAsync(instrument, cancellationToken: ct);
        }
    }

    private static async Task<List<T>> LoadSeedFileAsync<T>(string fileName)
    {
        var path = Path.Combine(AppContext.BaseDirectory, "Seed", fileName);
        if (!File.Exists(path))
        {
            Console.WriteLine($"[Seeder] Seed file not found: {path}");
            return new List<T>();
        }

        await using var stream = File.OpenRead(path);
        return await JsonSerializer.DeserializeAsync<List<T>>(stream, _jsonOptions)
               ?? new List<T>();
    }

    // Seed record DTOs
    private record BandRoleSeedRecord(string DisplayName, string Description);
    private record GenreSeedRecord(string DisplayName);
    private record InstrumentSeedRecord(string DisplayName, string InstrumentType);
}