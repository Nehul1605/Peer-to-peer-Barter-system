import { Navbar } from "../components/Navbar";
import { HeroSection } from "../components/HeroSection";
import { BentoFeatures } from "../components/BentoFeatures";
import { SmartMatching } from "../components/SmartMatching";
import { HowItWorks } from "../components/HowItWorks";
import { CTASection } from "../components/CTASection";
import { Footer } from "../components/Footer";



export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden font-sans selection:bg-white/20">
      <Navbar />
      <HeroSection />
      <BentoFeatures />
      <HowItWorks />
      <SmartMatching />
      <CTASection />
      <Footer />
    </div>
  );
}
