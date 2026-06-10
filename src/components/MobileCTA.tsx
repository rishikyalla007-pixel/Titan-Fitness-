import { motion, AnimatePresence } from "motion/react";
import { PhoneCall } from "lucide-react";
import { useState, useEffect } from "react";

export default function MobileCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show CTA after heroic section
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 left-0 right-0 z-40 bg-zinc-950/95 backdrop-blur-md border-t border-zinc-900 p-4 lg:hidden shadow-[0_-8px_30px_rgb(0,0,0,0.8)]"
        >
          <a
            href="tel:+919502858048"
            className="w-full flex items-center justify-center gap-2 py-4 rounded-xl btn-gradient text-black font-black uppercase tracking-widest text-sm shadow-[0_10px_30px_rgba(242,125,38,0.3)] active:scale-95 transition-transform"
          >
            <PhoneCall className="w-5 h-5 stroke-[2.5]" />
            Call Now: 9502858048
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
