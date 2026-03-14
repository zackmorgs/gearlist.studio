using Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace Data;

public sealed class Db
{
    public Db(IOptions<MongoDbSettings> options)
    {
        var config = options.Value;
        var client = new MongoClient(config.ConnectionString);
        var database = client.GetDatabase(config.DatabaseName);
        Users = database.GetCollection<User>(config.UsersCollectionName);
        BandRoles = database.GetCollection<BandRole>(config.BandRolesCollectionName);
        Artists = database.GetCollection<Artist>(config.ArtistsCollectionName);
        Bands = database.GetCollection<Band>(config.BandsCollectionName);
        Amps = database.GetCollection<Amp>(config.AmpsCollectionName);
    }
    public IMongoCollection<Amp> Amps { get; }
    public IMongoCollection<Artist> Artists { get; }
    public IMongoCollection<Band> Bands { get; }
    public IMongoCollection<BandRole> BandRoles { get; }
    public IMongoCollection<User> Users { get; }

    public async Task EnsureIndexesAsync(CancellationToken cancellationToken = default)
    {
        var emailIndex = new CreateIndexModel<User>(
            Builders<User>.IndexKeys.Ascending(user => user.Email),
            new CreateIndexOptions { Unique = true, Name = "UX_Users_Email" });

        await Users.Indexes.CreateOneAsync(emailIndex, cancellationToken: cancellationToken);
    }
}

public sealed class MongoDbSettings
{
    public string ConnectionString { get; set; } = "mongodb://localhost:27017";
    public string DatabaseName { get; set; } = "gearlist";
    public string AmpsCollectionName { get; set; } = "amps";
    public string ArtistsCollectionName { get; set; } = "artists";
    public string BandsCollectionName { get; set; } = "bands";
    public string BandRolesCollectionName { get; set; } = "band_roles";
    public string UsersCollectionName { get; set; } = "users";
}
