import Header from "./Components/landing-page/Header";
import Hero from "./Components/landing-page/Hero";
import Features from "./Components/landing-page/Features";
import Pricing from "./Components/landing-page/Pricing";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(SITE),
  title: "Zestro — Coming Soon",
  description:
    "Zestro: the future of restaurant management. Join the waitlist for early access.",
  openGraph: {
    title: "Zestro — Coming Soon",
    description:
      "Zestro: the future of restaurant management. Join the waitlist for early access.",
    images: [new URL("/techv-logo.png", SITE).toString()],
  },
};

export default function Page() {
  return (
    <main
      className="min-h-screen w-full"
      style={{ background: "var(--background)" }}
    >
      <Header />
      <Hero />
      <Features />
      <Pricing />
    </main>
  );
}
