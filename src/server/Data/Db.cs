using Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace Data;

public sealed class Db
{
    public Db(IOptions<MongoDbOptions> options)
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
    //public IMongoCollection<Equipment> Equipment { get; }
    public IMongoCollection<Genre> Genres { get; }
    public IMongoCollection<Instrument> Instruments { get; }
    public IMongoCollection<Pedal> Pedals { get; }
    public IMongoCollection<Plugin> Plugins { get; }
    public IMongoCollection<User> Users { get; }

    public async Task EnsureIndexesAsync(CancellationToken cancellationToken = default)
    {
        var emailIndex = new CreateIndexModel<User>(
            Builders<User>.IndexKeys.Ascending(user => user.Email),
            new CreateIndexOptions { Unique = true, Name = "UX_Users_Email" });

        await Users.Indexes.CreateOneAsync(emailIndex, cancellationToken: cancellationToken);
    }
}

public sealed class MongoDbOptions
{
    public string DatabaseName { get; set; } = "gearlist";
    public string ConnectionString { get; set; } = "mongodb://localhost:27017";
    public string AmpsCollectionName { get; set; } = "amps";
    public string ArtistsCollectionName { get; set; } = "artists";
    public string BandsCollectionName { get; set; } = "bands";
    public string BandRolesCollectionName { get; set; } = "band_roles";
    public string EquipmentCollectionName { get; set; } = "equipment";
    public string GenresCollectionName { get; set; } = "genres";
    public string InstrumentsCollectionName { get; set; } = "instruments";
    public string PedalsCollectionName { get; set; } = "pedals";
    public string PluginsCollectionName { get; set; } = "plugins";
    public string UsersCollectionName { get; set; } = "users";
    public string RolesCollectionName { get; set; } = "roles";
}
