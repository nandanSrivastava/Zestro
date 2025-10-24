/**
 * Simple utility to play celebration sounds
 */

export const playSuccessSound = () => {
  try {
    // Create a simple success sound using Web Audio API
    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();

    // Create a sequence of notes for a success jingle
    const notes = [
      { frequency: 523.25, duration: 0.2 }, // C5
      { frequency: 659.25, duration: 0.2 }, // E5
      { frequency: 783.99, duration: 0.2 }, // G5
      { frequency: 1046.5, duration: 0.4 }, // C6
    ];

    let startTime = audioContext.currentTime;

    notes.forEach((note, index) => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.setValueAtTime(note.frequency, startTime);
      oscillator.type = "sine";

      // Create envelope for smoother sound
      gainNode.gain.setValueAtTime(0, startTime);
      gainNode.gain.linearRampToValueAtTime(0.3, startTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        startTime + note.duration
      );

      oscillator.start(startTime);
      oscillator.stop(startTime + note.duration);

      startTime += note.duration * 0.8; // Slight overlap
    });
  } catch (error) {
    console.log("Success sound not available:", error.message);
    // Fallback: no sound, just visual celebration
  }
};

export const playFireworksSound = () => {
  try {
    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();

    // Create multiple bursts for fireworks effect
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        const filter = audioContext.createBiquadFilter();

        oscillator.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(audioContext.destination);

        // Firework burst sound
        oscillator.frequency.setValueAtTime(1000, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(
          100,
          audioContext.currentTime + 0.5
        );
        oscillator.type = "noise" in oscillator ? "noise" : "white";

        filter.type = "lowpass";
        filter.frequency.setValueAtTime(2000, audioContext.currentTime);
        filter.frequency.exponentialRampToValueAtTime(
          200,
          audioContext.currentTime + 0.5
        );

        gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(
          0.01,
          audioContext.currentTime + 0.5
        );

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
      }, i * 300);
    }
  } catch (error) {
    console.log("Fireworks sound not available:", error.message);
  }
};
