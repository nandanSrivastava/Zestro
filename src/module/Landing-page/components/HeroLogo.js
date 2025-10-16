"use client";

import React, { memo } from "react";
import Image from "next/image";

/**
 * Hero Logo component with proper accessibility and styling
 * @param {Object} props - Component props
 * @param {string} props.src - Logo image source
 * @param {string} props.alt - Logo alt text
 * @param {number} props.width - Logo width
 * @param {number} props.height - Logo height
 * @param {string} props.className - Additional CSS classes
 */
const HeroLogo = memo(
  ({ src, alt, width = 240, height = 72, className = "" }) => (
    <div className={`mx-auto hero-logo ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority
        className="mx-auto transition-transform duration-300 hover:scale-105"
      />
    </div>
  )
);

HeroLogo.displayName = "HeroLogo";

export default HeroLogo;
