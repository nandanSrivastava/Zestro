"use client";

import React, { memo } from "react";

/**
 * Animated background component for the Hero section
 * Features a gradient SVG wave animation
 */
const HeroBackground = memo(() => (
  <div className="absolute inset-0 z-0 animate-gradient-x">
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 1440 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      <path
        fill="var(--zestro-primary)"
        fillOpacity="0.12"
        d="M0,160L48,165.3C96,171,192,181,288,165.3C384,149,480,107,576,117.3C672,128,768,192,864,218.7C960,245,1056,235,1152,208C1248,181,1344,139,1392,117.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
      />
    </svg>
  </div>
));

HeroBackground.displayName = "HeroBackground";

export default HeroBackground;
