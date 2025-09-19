"use client";

import React, { memo } from "react";

/**
 * Individual feature card component with original glass card design
 */
const FeatureCard = memo(({ feature, onFeatureClick, styling }) => {
  const handleClick = () => {
    if (onFeatureClick) {
      onFeatureClick(feature);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      className={styling.card}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`Learn more about ${feature.title}`}
    >
      <div className={styling.cardContent}>
        <span className={styling.cardIcon}>{feature.icon}</span>
        <h4 className={styling.cardTitle}>{feature.title}</h4>
        <p className={styling.cardDescription}>{feature.description}</p>
      </div>
      <div className={styling.cardTeaser}>
        Teaser — details revealed after launch
      </div>
    </div>
  );
});

FeatureCard.displayName = "FeatureCard";

export default FeatureCard;
