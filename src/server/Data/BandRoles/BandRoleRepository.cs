using Data.Mongo;
using Microsoft.Extensions.Options;
using Models;
using MongoDB.Driver;

namespace Data.BandRoles;

public sealed class BandRoleRepository : IBandRoleRepository
{
    private readonly IMongoCollection<BandRole> _roles;

    public BandRoleRepository(IMongoDatabase db, IOptions<MongoDbSettings> options)
    {
        var collectionName = options.Value.BandRolesCollectionName;
        _roles = db.GetCollection<BandRole>(collectionName);
    }

    public async Task EnsureIndexesAsync(CancellationToken ct = default)
    {
        var slugIndex = new CreateIndexModel<BandRole>(
            Builders<BandRole>.IndexKeys.Ascending(x => x.Slug),
            new CreateIndexOptions { Unique = true, Name = "ux_bandrole_slug" });

        await _roles.Indexes.CreateOneAsync(slugIndex, cancellationToken: ct);
    }

    public async Task UpsertManyAsync(IEnumerable<BandRole> roles, CancellationToken ct = default)
    {
        foreach (var role in roles)
        {
            var filter = Builders<BandRole>.Filter.Eq(x => x.Slug, role.Slug);
            await _roles.ReplaceOneAsync(filter, role, new ReplaceOptions { IsUpsert = true }, ct);
        }
    }
}