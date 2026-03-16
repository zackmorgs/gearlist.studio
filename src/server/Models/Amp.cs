namespace Models;

public class Amp : Equipment
{
    public bool IsBassAmp { get; set; }
    public bool IsCombo { get; set; } // is false if head only

    // type : tube, solid-state, modeling, hybrid, etc.
    public string AmpType { get; set; } = string.Empty;
}