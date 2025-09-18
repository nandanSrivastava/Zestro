

import Image from 'next/image'
import Countdown from './Countdown'

function nextMonth21() {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth() // 0-indexed
  // target month is next month
  const targetMonth = month === 11 ? 0 : month + 1
  const targetYear = month === 11 ? year + 1 : year
  // 21st of next month at 00:00:00 UTC
  return new Date(Date.UTC(targetYear, targetMonth, 21, 0, 0, 0))
}

export default function Hero() {
  return (
  <section className="relative w-full hero-section flex flex-col justify-center items-center hero-bg overflow-hidden py-4">
      <div className="absolute inset-0 z-0 animate-gradient-x">
        <svg width="100%" height="100%" viewBox="0 0 1440 320" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill="var(--zestro-primary)" fillOpacity="0.12" d="M0,160L48,165.3C96,171,192,181,288,165.3C384,149,480,107,576,117.3C672,128,768,192,864,218.7C960,245,1056,235,1152,208C1248,181,1344,139,1392,117.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
  <div className="relative z-10 text-center glass-card rounded-3xl shadow-2xl px-4 sm:px-8 py-4 sm:py-8 w-full max-w-[980px] mx-auto animate-fade-in">
  <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold drop-shadow mb-3 sm:mb-5 animate-fade-in">
    <span className="sr-only">Zestro</span>
  <Image src="/zestro-logo.png" alt="Zestro" width={240} height={72} className="mx-auto hero-logo" />
  </h1>
  <h2 className="text-base sm:text-xl md:text-2xl font-semibold text-[color:rgba(15,23,42,0.9)] mb-3 sm:mb-6 animate-fade-in">The Future of Restaurant Management — Coming Soon</h2>
  <p className="text-sm sm:text-base text-[color:rgba(15,23,42,0.8)] mb-6 sm:mb-8 animate-fade-in">A bold new platform built to streamline operations, delight customers, and empower teams. Sign up for early access.</p>
        <div className="flex flex-col gap-6 justify-center mb-8 animate-fade-in">
          <div className="text-center">
            <p className="text-lg text-[var(--zestro-orange-800)] font-semibold mb-3">Launching soon</p>
            <div className="mx-auto mb-2">
              <Countdown target={nextMonth21()} />
            </div>
          </div>
          <div className="flex justify-center">
            <a href="#contact" className="btn-primary">Notify Me</a>
          </div>
        </div>
      </div>
    </section>
  );
}
