// Audio utility functions for managing sounds and music
export class AudioManager {
  private audioContext: AudioContext | null = null;
  private backgroundMusic: HTMLAudioElement | null = null;
  private soundEffects: { [key: string]: HTMLAudioElement } = {};
  private isInitialized: boolean = false;
  private activeOscillators: OscillatorNode[] = [];

  constructor() {
    // Initialize audio context for web audio API
    if (typeof window !== 'undefined') {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  }

  // Initialize audio context with user interaction
  private async initializeAudio() {
    if (this.isInitialized || !this.audioContext) return;
    
    try {
      if (this.audioContext.state === 'suspended') {
        await this.audioContext.resume();
      }
      this.isInitialized = true;
      console.log('Audio context initialized successfully');
    } catch (error) {
      console.error('Failed to initialize audio context:', error);
    }
  }

  // Stop all audio - new method to stop everything
  stopAllAudio() {
    console.log('Stopping all audio...');
    
    // Stop background music
    this.stopBackgroundMusic();
    
    // Stop all active oscillators
    this.activeOscillators.forEach(oscillator => {
      try {
        oscillator.stop();
      } catch (error) {
        // Oscillator might already be stopped
      }
    });
    this.activeOscillators = [];
    
    // Stop all sound effects
    Object.values(this.soundEffects).forEach(audio => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    });
    
    console.log('All audio stopped successfully');
  }

  // Play background music
  async playBackgroundMusic(volume: number = 0.3) {
    await this.initializeAudio();
    
    if (!this.backgroundMusic) {
      this.backgroundMusic = new Audio();
      this.backgroundMusic.loop = true;
      this.backgroundMusic.volume = volume;
    }
    
    // Generate a simple background melody using Web Audio API
    this.createBackgroundMelody();
  }

  // Stop background music
  stopBackgroundMusic() {
    if (this.backgroundMusic) {
      this.backgroundMusic.pause();
      this.backgroundMusic.currentTime = 0;
    }
  }

  // Play animal sounds
  async playAnimalSound(animal: string) {
    await this.initializeAudio();
    console.log(`Playing sound for: ${animal}`);
    
    const frequency = this.getAnimalFrequency(animal);
    const duration = 1.0; // Longer duration for animal sounds
    
    // Play the base frequency
    this.playTone(frequency, duration, 'sawtooth');
    
    // Add some harmonic variation for more realistic animal sounds
    setTimeout(() => {
      this.playTone(frequency * 1.2, duration * 0.5, 'sawtooth');
    }, 100);
    
    setTimeout(() => {
      this.playTone(frequency * 0.8, duration * 0.3, 'square');
    }, 200);
  }

  // Play success sound
  async playSuccessSound() {
    await this.initializeAudio();
    this.playMelody([523, 659, 784], 200, 'sine');
  }

  // Play error sound
  async playErrorSound() {
    await this.initializeAudio();
    this.playTone(200, 0.5, 'sawtooth');
  }

  // Play click sound
  async playClickSound() {
    await this.initializeAudio();
    this.playTone(800, 0.1, 'square');
  }

  // Play musical note
  async playNote(note: string) {
    await this.initializeAudio();
    const frequency = this.getNoteFrequency(note);
    console.log(`Playing note: ${note} at frequency: ${frequency}Hz`);
    this.playTone(frequency, 0.8, 'sine');
  }

  // Play rhythm pattern
  async playRhythm(pattern: number[], tempo: number = 500) {
    await this.initializeAudio();
    console.log('Playing rhythm pattern:', pattern);
    
    pattern.forEach((beat, index) => {
      if (beat === 1) {
        setTimeout(() => {
          this.playTone(400, 0.3, 'square');
        }, index * tempo);
      }
    });
  }

  // Create background melody
  private createBackgroundMelody() {
    if (!this.audioContext || !this.isInitialized) return;
    
    const melody = [523, 587, 659, 698, 784, 880, 988, 1047]; // C major scale
    let currentNote = 0;
    
    const playNextNote = () => {
      if (this.isInitialized) {
        this.playTone(melody[currentNote], 0.2, 'sine');
        currentNote = (currentNote + 1) % melody.length;
        setTimeout(playNextNote, 2000);
      }
    };
    
    setTimeout(playNextNote, 1000);
  }

  // Play a single tone - made public to fix build error
  public playTone(frequency: number, duration: number, waveType: OscillatorType = 'sine') {
    if (!this.audioContext || !this.isInitialized) {
      console.log('Audio context not initialized, cannot play tone');
      return;
    }

    try {
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);

      oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
      oscillator.type = waveType;

      // Smooth volume envelope
      gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.3, this.audioContext.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);

      oscillator.start(this.audioContext.currentTime);
      oscillator.stop(this.audioContext.currentTime + duration);
      
      // Track active oscillators for cleanup
      this.activeOscillators.push(oscillator);
      
      // Remove from tracking when it naturally ends
      setTimeout(() => {
        const index = this.activeOscillators.indexOf(oscillator);
        if (index > -1) {
          this.activeOscillators.splice(index, 1);
        }
      }, duration * 1000);
      
      console.log(`Playing tone: ${frequency}Hz for ${duration}s`);
    } catch (error) {
      console.error('Error playing tone:', error);
    }
  }

  // Play a melody
  private async playMelody(frequencies: number[], noteDuration: number, waveType: OscillatorType = 'sine') {
    await this.initializeAudio();
    
    frequencies.forEach((freq, index) => {
      setTimeout(() => {
        this.playTone(freq, noteDuration / 1000, waveType);
      }, index * noteDuration);
    });
  }

  // Get frequency for animal sounds - enhanced with more realistic frequencies
  private getAnimalFrequency(animal: string): number {
    const animalFrequencies: { [key: string]: number } = {
      'Dog': 600,      // Lower, more bark-like
      'Cat': 800,      // Higher pitched meow
      'Cow': 150,      // Very low moo
      'Pig': 300,      // Mid-range oink
      'Duck': 1000,    // Higher quack
      'Horse': 250,    // Low neigh
      'Sheep': 500,    // Mid-range baa
      'Rooster': 1200  // High cock-a-doodle-doo
    };
    return animalFrequencies[animal] || 440;
  }

  // Get frequency for musical notes - enhanced scale
  private getNoteFrequency(note: string): number {
    const noteFrequencies: { [key: string]: number } = {
      'Do': 523,   // C5
      'Re': 587,   // D5
      'Mi': 659,   // E5
      'Fa': 698,   // F5
      'So': 784,   // G5
      'La': 880,   // A5
      'Ti': 988,   // B5
      'C': 523,
      'D': 587,
      'E': 659,
      'F': 698,
      'G': 784,
      'A': 880,
      'B': 988
    };
    return noteFrequencies[note] || 440;
  }

  // Check if audio is ready
  isAudioReady(): boolean {
    return this.isInitialized && this.audioContext !== null;
  }
}

// Create a singleton instance
export const audioManager = new AudioManager();
