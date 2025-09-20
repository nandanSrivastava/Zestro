/**
 * Hero section configuration and content
 */

export const HERO_CONFIG = {
  logo: {
    src: "/images/zestro-logo.png",
    alt: "Zestro",
    width: 240,
    height: 72,
  },
  content: {
    title: "Zestro",
    subtitle: "The Future of Restaurant Management — Coming Soon",
    description:
      "A new platform built to streamline operations, delight customers, and empower teams.",
    launchText: "Launching soon",
    ctaText: "Join waitlist",
  },
  animation: {
    fadeInDelay: "animate-fade-in",
    logoHover: "hover:scale-105",
    launchTextHover: "hover:scale-105",
  },
  styling: {
    section:
      "relative w-full hero-section flex flex-col justify-center items-center hero-bg overflow-hidden py-4",
    container:
      "relative z-10 text-center glass-card rounded-3xl shadow-2xl px-4 sm:px-8 py-4 sm:py-8 w-full max-w-[980px] mx-auto animate-fade-in",
    title:
      "text-3xl sm:text-5xl md:text-6xl font-extrabold drop-shadow mb-3 sm:mb-5 animate-fade-in",
    subtitle:
      "text-base sm:text-xl md:text-2xl font-semibold text-[color:rgba(15,23,42,0.9)] mb-3 sm:mb-6 animate-fade-in",
    description:
      "text-sm sm:text-base text-[color:rgba(15,23,42,0.8)] mb-6 sm:mb-8 animate-fade-in",
    launchText:
      "text-2xl font-serif hover:scale-105 text-[var(--zestro-orange-800)] font-extrabold mb-3",
    countdownContainer:
      "flex flex-col gap-6 justify-center mb-8 animate-fade-in",
  },
};
