namespace Models;

public class Artist
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Slug Slug { get; set; } = new Slug(string.Empty);
    public string DisplayName { get; set; } = string.Empty;
    public DateTime CreatedAtUtc { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAtUtc { get; set; } = DateTime.UtcNow;
    public List<Guid> BandGuids { get; set; } = new List<Guid>();
    public List<string> Roles { get; set; } = new List<string>();
    public List<Guid> EquipmentGuids { get; set; } = new List<Guid>();
    public List<Guid> GenreGuids { get; set; } = new List<Guid>();
    public string Description { get; set; } = string.Empty;
}
