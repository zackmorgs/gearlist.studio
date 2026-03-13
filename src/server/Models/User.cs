namespace Models;

public class User
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string? GoogleId { get; set; }
    public Slug Slug { get; set; } = new Slug(string.Empty);
    public string? ProfileImageUrl { get; set; }
    public string DisplayName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    public DateTime CreatedAtUtc { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAtUtc { get; set; } = DateTime.UtcNow;

}
