import LandingPage from "@/module/Landing-page";
import Dashboard from "@/module/Dashboard";

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
    images: [new URL("/images/techv-logo.png", SITE).toString()],
  },
};

export default function Page() {
  return (
    <>
      {/* <LandingPage /> */}
      <Dashboard />
    </>
  );
}
