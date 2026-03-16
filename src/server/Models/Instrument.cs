namespace Models;

public class Instrument : Equipment
{
    public Guid InstrumentTypeGuid { get; set; } = Guid.Empty;
    // Possible Values
    // - Guitar
    // - Bass
    // - Drums
    // - Keyboard
    // - Synthesizer
    // - Etc.
    // - Etc.
    // - Etc.  
}