"use client";

import { useState } from "react";
import Image from "next/image";
import WaitlistModal from "../ui/WaitlistModal";

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="w-full py-3 px-4 sm:px-6 flex items-center justify-between bg-[var(--zestro-accent)] sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <Image
          src="/images/zestro-logo.png"
          alt="Zestro"
          width={100}
          height={100}
        />
      </div>
      <nav className="hidden md:flex items-center gap-4">
        <a href="#features" className="text-white hover:underline">
          Features
        </a>
        <button
          type="button"
          className="btn-primary"
          onClick={() => setOpen(true)}
        >
          Notify
        </button>
      </nav>
      <button
        className="md:hidden p-2 rounded-lg"
        onClick={() => setOpen((o) => !o)}
        aria-label="Toggle menu"
      >
        <svg
          className="w-6 h-6 text-[var(--zestro-orange-800)]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
          />
        </svg>
      </button>
      {open && (
        <div className="absolute right-4 top-16 glass-card rounded-lg p-4 shadow-lg md:hidden">
          <a
            href="#features"
            className="block py-2 text-[var(--zestro-orange-700)]"
          >
            Features
          </a>
          <button
            type="button"
            className="block py-2 mt-2 btn-primary text-center"
            onClick={() => setOpen(true)}
          >
            Notify
          </button>
        </div>
      )}
      <WaitlistModal open={open} onClose={() => setOpen(false)} />
    </header>
  );
}
