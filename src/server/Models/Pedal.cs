namespace Models;

public class Pedal : Equipment
{
    public string PedalType { get; set; } = string.Empty;
    // Possible values: 
    // ---
    // Overdrive
    // Distortion
    // Fuzz
    // Boost / Clean Boost
    // Treble Boost
    // Preamp
    // Amp-in-a-box
    // Chorus
    // Flanger
    // Phaser
    // Tremolo
    // Vibrato
    // Rotary Speaker / Leslie
    // Uni-Vibe
    // Ring Modulator
    // Delay
    // Reverb
    // Echo / Tape Echo
    // Multi-delay
    // Octave
    // Pitch Shifter
    // Harmonizer
    // Whammy / Expression Pitch
    // Detune
    // Micro Pitch
    // Wah
    // Auto Wah
    // Envelope Filter
    // Touch Wah
    // Resonant Filter
    // Compressor
    // Limiter
    // Expander
    // Noise Gate / Noise Suppressor
    // Sustainer
    // EQ (Graphic)
    // EQ (Parametric)
    // Tone Shaper
    // Cab Simulator
    // IR Loader
    // Volume Pedal
    // Expression Pedal
    // Loop Switcher
    // A/B Switch
    // A/B/Y Switch
    // Line Selector
    // Buffer
    // Synth Pedal
    // Bitcrusher
    // Glitch
    // Freeze / Sustain
    // Feedback Generator
    // Sample / Hold
    // Step Filter
    // Multi-FX Processor
    // Amp Modeler
    // Floor Modeler
    // Looper
    // Phrase Sampler

    public bool IsBassPedal { get; set; }

}