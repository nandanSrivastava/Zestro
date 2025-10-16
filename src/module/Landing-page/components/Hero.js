"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "../styles/Hero.module.css";
import Countdown from "../components/Countdown";
import WaitlistModal from "../components/WaitlistModal";

function nextMonth21() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const targetMonth = month === 11 ? 0 : month + 1;
  const targetYear = month === 11 ? year + 1 : year;
  return new Date(Date.UTC(targetYear, targetMonth, 21, 0, 0, 0));
}

export default function Hero() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [target, setTarget] = useState(null);

  useEffect(() => {
    setMounted(true);
    setTarget(nextMonth21());
  }, []);

  return (
    <section className="relative w-full hero-section flex flex-col justify-center items-center hero-bg overflow-hidden py-2 sm:py-4">
      <div className="absolute inset-0 z-0 animate-gradient-x">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1440 320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="var(--zestro-primary)"
            fillOpacity="0.12"
            d="M0,160L48,165.3C96,171,192,181,288,165.3C384,149,480,107,576,117.3C672,128,768,192,864,218.7C960,245,1056,235,1152,208C1248,181,1344,139,1392,117.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>

      <div className="relative z-10 text-center glass-card rounded-none sm:rounded-3xl shadow-none sm:shadow-2xl px-4 sm:px-8 py-6 sm:py-8 w-full max-w-none sm:max-w-[980px] mx-auto animate-fade-in flex flex-col justify-center gap-1 sm:gap-6">
        <div className="animate-fade-in">
          <div className="mx-auto mb-3 sm:mb-2">
            <Image
              src="/images/zestro-logo.png"
              alt="Zestro"
              width={240}
              height={72}
              className={`mx-auto ${styles.heroLogo}`}
            />
          </div>

          <h1 className="text-lg sm:text-2xl md:text-3xl font-semibold drop-shadow mb-1 sm:mb-4 leading-tight mt-3 sm:mt-0">
            The Future of Restaurant Management — Coming Soon
          </h1>
        </div>
        <p className="intro-mobile-theme text-base sm:text-base mb-6 sm:mb-8 animate-fade-in font-serif">
          A new platform <br className="block sm:hidden" /> built to streamline
          operations,
          <br className="block sm:hidden" /> delight customers, and
          <br className="block sm:hidden" /> empower teams.
        </p>

        <div className="flex flex-col gap-6 justify-center mb-8 animate-fade-in">
          <div className="text-center">
            <p className="launching-soon text-2xl font-serif hover:scale-105 text-[var(--zestro-orange-800)] font-extrabold mb-3">
              Launching soon
            </p>
            <div className="mx-auto mb-2">
              {mounted && target ? (
                <Countdown target={target} />
              ) : (
                <div className="flex gap-3 justify-center items-center text-center text-white">
                  <div className="time-unit bg-[color:var(--zestro-orange-700)]/90 px-3 py-2 rounded-lg min-w-[64px]">
                    --
                  </div>
                  <div className="time-unit bg-[color:var(--zestro-orange-700)]/90 px-3 py-2 rounded-lg min-w-[64px]">
                    --
                  </div>
                  <div className="time-unit bg-[color:var(--zestro-orange-700)]/90 px-3 py-2 rounded-lg min-w-[64px]">
                    --
                  </div>
                  <div className="time-unit bg-[color:var(--zestro-orange-700)]/90 px-3 py-2 rounded-lg min-w-[64px]">
                    --
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-center">
            <button
              type="button"
              className="btn-primary text-base sm:text-base"
              onClick={() => setIsOpen(true)}
            >
              Join waitlist
            </button>
          </div>
        </div>
        <WaitlistModal open={isOpen} onClose={() => setIsOpen(false)} />
      </div>
    </section>
  );
}
