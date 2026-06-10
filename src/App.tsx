import { useState, useEffect } from "react";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Plans from "./components/Plans";
import Trainers from "./components/Trainers";
import TransformationGallery from "./components/TransformationGallery";
import Testimonials from "./components/Testimonials";
import Gallery from "./components/Gallery";
import BMICalculator from "./components/BMICalculator";
import WorkoutTracker from "./components/WorkoutTracker";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import FloatingCallButton from "./components/FloatingCallButton";
import MobileCTA from "./components/MobileCTA";
import { motion, AnimatePresence } from "motion/react";
import { ChevronUp } from "lucide-react";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Monitor Scroll Progress & Scroll-to-Top triggers
  useEffect(() => {
    const handleScroll = () => {
      // Calculate Scroll progress percentage
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }

      // Show scroll to top button
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <div className="bg-[#050505] text-zinc-100 min-h-screen relative font-sans selection:bg-brand selection:text-black">
      
      {/* Global AnimatePresence entry loader screen */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <Loader onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {!isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="relative min-h-screen"
        >
          {/* Elite top scroll progress indicator bar */}
          <div className="fixed top-0 left-0 w-full h-[3px] bg-zinc-900 z-50 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-brand to-orange-400 shadow-[0_0_10px_rgba(255,77,0,0.5)]"
              style={{ width: `${scrollProgress}%` }}
            />
          </div>

          {/* Sticky header navigation */}
          <Navbar />

          {/* Home Section */}
          <Hero />

          {/* Features Block */}
          <Features />

          {/* Membership Tier Cards */}
          <Plans />

          {/* Elite Trainers Profile Deck */}
          <Trainers />

          {/* Success transformations ledger */}
          <TransformationGallery />

          {/* Realistic glassmorphism testimonials */}
          <Testimonials />

          {/* Multi-Filter visual compound galley */}
          <Gallery />

          {/* High-Accuracy body index simulation tool */}
          <BMICalculator />

          {/* Premium interactive Workout Tracker Companion */}
          <WorkoutTracker />

          {/* Dynamic messages dispatcher and CP location locator */}
          <Contact />

          {/* Unified corporate footer panels */}
          <Footer />

          {/* Floating Call trigger */}
          <FloatingCallButton />

          {/* Sticky Mobile CTA */}
          <MobileCTA />

          {/* Premium Floating Scroll to top trigger widget */}
          <AnimatePresence>
            {showScrollTop && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 15 }}
                transition={{ duration: 0.2 }}
                onClick={handleScrollToTop}
                className="fixed bottom-6 right-6 p-3.5 rounded-xl bg-brand font-bold text-zinc-950 border border-brand/20 shadow-[0_0_20px_rgba(255,77,0,0.35)] hover:bg-brand-hover hover:scale-105 active:scale-95 transition z-40 cursor-pointer"
                aria-label="Scroll to top of page"
              >
                <ChevronUp className="w-5 h-5 stroke-[2.5]" />
              </motion.button>
            )}
          </AnimatePresence>

        </motion.div>
      )}

    </div>
  );
}
