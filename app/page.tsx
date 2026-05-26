import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Manifesto from "@/components/landing/Manifesto";
import CaptureSection from "@/components/landing/CaptureSection";
import ReflectSection from "@/components/landing/ReflectSection";
import MagicSection from "@/components/landing/MagicSection";
import FeatureTriad from "@/components/landing/FeatureTriad";
import Testimonials from "@/components/landing/Testimonials";
import ClosingCTA from "@/components/landing/ClosingCTA";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Manifesto />
        <CaptureSection />
        <ReflectSection />
        <MagicSection />
        <FeatureTriad />
        <Testimonials />
        <ClosingCTA />
      </main>
      <Footer />
    </>
  );
}
