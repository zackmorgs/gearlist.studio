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
    }

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
    public string ConnectionString { get; set; } = "mongodb://localhost:27017";
    public string DatabaseName { get; set; } = "gearlist";
    public string UsersCollectionName { get; set; } = "users";
}
