namespace Models;

public class Plugin : Equipment
{
    public string PluginType { get; set; } = string.Empty;
    // Possible values: 
    // ---
    //Amp Simulator
    //Cabinet Simulator
    //Impulse Response Loader
    //Overdrive
    //Distortion
    //Fuzz
    //Boost
    //Chorus
    //Flanger
    //Phaser
    //Tremolo
    //Vibrato
    //Rotary Speaker
    //Delay
    //Echo
    //Reverb
    //Compressor
    //Limiter
    //Expander
    //Noise Gate
    //De-Esser
    //Equalizer
    //Dynamic EQ
    //Saturation
    //Exciter
    //Transient Shaper
    //Pitch Shifter
    //Harmonizer
    //Octaver
    //Auto-Tune / Pitch Correction
    //Vocoder
    //Ring Modulator
    //Bitcrusher
    //Granular
    //Filter
    //Auto Filter
    //Envelope Filter
    //Step Filter
    //Guitar Synth
    //Instrument Synth
    //Sampler
    //Drum Machine
    //Looper
    //Multi Effects
    //Channel Strip
    //Preamp
    //Tape Emulation
    //Console Emulation
    //Mastering Suite
    //Stereo Imager
    //Mid/Side Processor
    //Metering
    //Spectrum Analyzer
    //Loudness Meter
    //Utility
}