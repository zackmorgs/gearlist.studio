using MongoDB.Driver;
using Slugify;

namespace Services;

public interface ISlugService
{
    Task<string> GenerateUniqueSlugAsync<T>(
        IMongoCollection<T> collection,
        System.Linq.Expressions.Expression<Func<T, string>> slugField,
        string displayName,
        CancellationToken ct = default);
}

public sealed class SlugService : ISlugService
{
    private readonly SlugHelper _slugHelper = new();

    public async Task<string> GenerateUniqueSlugAsync<T>(
        IMongoCollection<T> collection,
        System.Linq.Expressions.Expression<Func<T, string>> slugField,
        string displayName,
        CancellationToken ct = default)
    {
        var baseSlug = _slugHelper.GenerateSlug(displayName);
        var candidate = baseSlug;
        var suffix = 1;

        while (await SlugExistsAsync(collection, slugField, candidate, ct))
        {
            candidate = $"{baseSlug}-{suffix++}";
        }

        return candidate;
    }

    private static async Task<bool> SlugExistsAsync<T>(
        IMongoCollection<T> collection,
        System.Linq.Expressions.Expression<Func<T, string>> slugField,
        string slug,
        CancellationToken ct)
    {
        var filter = Builders<T>.Filter.Eq(slugField, slug);
        return await collection.Find(filter).AnyAsync(ct);
    }
}