namespace Models;

public class Amp : Equipment
{
    public bool IsBassAmp { get; set; }
    public bool IsCombo { get; set; }

    // type : tube, solid-state, modeling, hybrid, etc.
    public string AmpType { get; set; } = string.Empty;
    public Slug Slug { get; set; } = new Slug(string.Empty);
}