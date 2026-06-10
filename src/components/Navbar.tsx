import React, { useState, useEffect } from "react";
import { Dumbbell, Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface NavLink {
  label: string;
  href: string;
}

const NAV_LINKS: NavLink[] = [
  { label: "Hero", href: "#home" },
  { label: "Features", href: "#features" },
  { label: "Membership Plans", href: "#plans" },
  { label: "Trainers", href: "#trainers" },
  { label: "Success Stories", href: "#testimonials" },
  { label: "BMI", href: "#bmi" },
  { label: "Workout Tracker", href: "#workout-tracker" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Simple active link calculation based on layout positions
      const scrollPosition = window.scrollY + 120;
      for (const link of NAV_LINKS) {
        const el = document.querySelector(link.href);
        if (el) {
          const top = (el as HTMLElement).offsetTop;
          const height = (el as HTMLElement).offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(link.href.replace("#", ""));
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      const topOffset = 80;
      const elementPosition = (targetElement as HTMLElement).offsetTop;
      const offsetPosition = elementPosition - topOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setActiveSection(href.replace("#", ""));
    }
  };

  return (
    <>
      <nav
        className={`fixed top-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-7xl z-50 transition-all duration-300 rounded-2xl ${
          isScrolled
            ? "py-3 bg-[#050505]/85 backdrop-blur-md border border-zinc-800/80 shadow-[0_12px_40px_rgba(0,0,0,0.8)]"
            : "py-4 bg-[#050505]/20 backdrop-blur-sm border border-zinc-900/40"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a
              href="#home"
              onClick={(e) => handleLinkClick(e, "#home")}
              className="flex items-center gap-2 group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl btn-gradient flex items-center justify-center transition-transform duration-300 group-hover:rotate-12">
                <Dumbbell className="w-5 h-5 text-black stroke-[3.2]" />
              </div>
              <span className="font-display font-black text-xl tracking-[0.11em] text-white">
                TITAN<span className="text-[#F27D26]">FITNESS</span>
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              <div className="flex items-center gap-1 bg-[#050505]/80 border border-zinc-800/60 rounded-full px-4 py-1.5 backdrop-blur-md">
                {NAV_LINKS.map((link) => {
                  const sectionName = link.href.replace("#", "");
                  const isActive = activeSection === sectionName;
                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className={`relative px-2.5 xl:px-4 py-1.5 text-[9.5px] xl:text-[11px] font-black uppercase tracking-wider rounded-full transition-colors duration-300 cursor-pointer ${
                        isActive ? "text-black" : "text-zinc-400 hover:text-white"
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="activeNavBackground"
                          className="absolute inset-0 btn-gradient rounded-full -z-10 shadow-[0_0_15px_rgba(242,125,38,0.3)]"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                      {link.label}
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href="tel:+919502858048"
                className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-xl btn-gradient text-black text-xs font-black uppercase tracking-widest overflow-hidden transition-all duration-300 hover:scale-103 active:scale-97 shadow-[0_0_20px_rgba(242,125,38,0.25)] cursor-pointer"
              >
                Call to Join
                <ArrowRight className="w-4 h-4 text-black transition-transform duration-300 group-hover:translate-x-1" style={{ strokeWidth: '3px' }} />
              </a>
            </div>

            {/* Mobile Hamburger Menu Link */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 transition cursor-pointer"
                aria-label="Toggle Menu"
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Panel */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="lg:hidden border-t border-zinc-900 mt-3 pt-3 px-4 pb-6 space-y-2 bg-[#050505]/95 backdrop-blur-lg rounded-b-2xl text-left"
            >
              <div className="space-y-1">
                {NAV_LINKS.map((link) => {
                  const sectionName = link.href.replace("#", "");
                  const isActive = activeSection === sectionName;
                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className={`block px-4 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                        isActive
                          ? "bg-brand/10 text-brand border-l-4 border-brand pl-3"
                          : "text-zinc-400 hover:text-white hover:bg-zinc-900"
                      }`}
                    >
                      {link.label}
                    </a>
                  );
                })}
                <div className="pt-4">
                  <a
                    href="tel:+919502858048"
                    className="flex items-center justify-center gap-2 w-full py-4 rounded-xl btn-gradient text-black font-black uppercase text-xs tracking-widest hover:scale-102 transition shadow-[0_0_20px_rgba(242,125,38,0.2)] cursor-pointer"
                  >
                    Call to Join
                    <ArrowRight className="w-4 h-4 stroke-[3]" />
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
