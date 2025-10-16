import styles from "./styles.module.css";
import Header from "../../module/Landing-page/components/Header";
import Hero from "../../module/Landing-page/components/Hero";
import Features from "../../module/Landing-page/components/Features";
import Pricing from "../../module/Landing-page/components/Pricing";
import Footer from "../../module/Landing-page/components/Footer";

export default function LandingPage() {
  return (
    <main className={`min-h-screen w-full ${styles.mainBackground}`}>
      <Header />
      <Hero />
      <Features />
      <Pricing />
      <Footer />
    </main>
  );
}
