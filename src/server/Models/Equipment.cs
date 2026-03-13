namespace Models;

public class Equipment
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Slug Slug { get; set; } = new Slug(string.Empty);
    public string DisplayName { get; set; } = string.Empty;
    public string AmazonID { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string ImageUrl { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public DateTime CreatedAtUtc { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAtUtc { get; set; } = DateTime.UtcNow;
}
