import { useEffect, useState } from "react";
import styles from "./Celebration.module.css";
import {
  playSuccessSound,
  playFireworksSound,
} from "../utils/celebrationSounds";

const Celebration = ({ show, onComplete }) => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (!show) return;

    // Play celebration sounds
    playSuccessSound();
    setTimeout(() => playFireworksSound(), 500);

    // Generate random particles for the celebration
    const generateParticles = () => {
      const newParticles = [];
      for (let i = 0; i < 30; i++) {
        // Reduced from 50 for modal
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 50, // Start higher for modal bounds
          color: [
            "#FFD700",
            "#FF6B6B",
            "#4ECDC4",
            "#45B7D1",
            "#96CEB4",
            "#FFEAA7",
          ][Math.floor(Math.random() * 6)],
          size: Math.random() * 6 + 3, // Slightly smaller
          delay: Math.random() * 0.5,
          duration: Math.random() * 2 + 1.5, // Slightly longer for modal
        });
      }
      setParticles(newParticles);
    };

    generateParticles();

    // Auto-complete after animation
    const timer = setTimeout(() => {
      onComplete?.();
    }, 3000);

    return () => clearTimeout(timer);
  }, [show, onComplete]);

  if (!show) return null;

  return (
    <div className={styles.celebrationOverlay}>
      {/* Fireworks - positioned for modal */}
      <div className={styles.firework} style={{ left: "15%", top: "15%" }}>
        <div className={styles.fireworkInner}></div>
      </div>
      <div
        className={styles.firework}
        style={{ left: "75%", top: "20%", animationDelay: "0.5s" }}
      >
        <div className={styles.fireworkInner}></div>
      </div>
      <div
        className={styles.firework}
        style={{ left: "45%", top: "10%", animationDelay: "1s" }}
      >
        <div className={styles.fireworkInner}></div>
      </div>

      {/* Confetti particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className={styles.confetti}
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            backgroundColor: particle.color,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
          }}
        />
      ))}

      {/* Success message */}
      <div className={styles.celebrationMessage}>
        <div className={styles.successIcon}>🎉</div>
        <h2 className={styles.successTitle}>Congratulations!</h2>
        <p className={styles.successText}>
          Your restaurant application has been submitted successfully!
        </p>
      </div>
    </div>
  );
};

export default Celebration;
