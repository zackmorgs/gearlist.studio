namespace Data.Mongo;

public sealed class MongoDbSettings
{
    public string ConnectionString { get; set; } = "mongodb://localhost:27017";
    public string DatabaseName { get; set; } = "gearlist";
    public string RolesCollectionName { get; set; } = "roles";
    public string BandRolesCollectionName { get; init; } = "band_roles";
}