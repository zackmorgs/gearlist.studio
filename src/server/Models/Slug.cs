namespace Models;

public class Slug
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Value { get; set; } = string.Empty;
    // need a constructor
    public Slug(string value)
    {
        Value = value;
    }
}