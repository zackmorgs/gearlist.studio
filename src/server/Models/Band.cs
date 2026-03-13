namespace Models;

public class Band
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Slug Slug { get; set; } = new Slug(string.Empty);
    public string DisplayName { get; set; } = string.Empty;
    public DateTime CreatedAtUtc { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAtUtc { get; set; } = DateTime.UtcNow;
    public List<Guid> ArtistGuids { get; set; } = new List<Guid>();
    public List<string> GenreTags { get; set; } = new List<string>();
}
