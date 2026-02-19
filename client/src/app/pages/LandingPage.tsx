import { Navbar } from "../components/Navbar";
import { HeroSection } from "../components/HeroSection";
import { HowItWorks } from "../components/HowItWorks";
import { WhyCredits } from "../components/WhyCredits";
import { Features } from "../components/Features";
import { TechStack } from "../components/TechStack";
import { Testimonials } from "../components/Testimonials";
import { CTASection } from "../components/CTASection";
import { Footer } from "../components/Footer";

/**
 * SkillBarter Landing Page
 * A modern, premium animated landing page for a P2P skill exchange platform
 */
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-white overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <HowItWorks />
      <WhyCredits />
      <Features />
      <TechStack />
      <Testimonials />
      <CTASection />
      <Footer />
    </div>
  );
}
