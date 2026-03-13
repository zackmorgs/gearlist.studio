namespace Models;

public class BandRole
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Slug { get; set; } = string.Empty;
    public string DisplayName { get; set; } = string.Empty;
    // Possible Roles
    // - Producers
    // - Guitarists
    // - Drummers
    // - Bassists
    // - Rappers
    // - Composers
    // - Keyboardists
    // - Singers
    // - Ukulele Players
    // - Audio Engineers
    // - Saxophonists
    // - Trumpeters
    // - Harpists
    // - Trombonists
    // - Violinists
    public DateTime CreatedAtUtc { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAtUtc { get; set; } = DateTime.UtcNow;
}
