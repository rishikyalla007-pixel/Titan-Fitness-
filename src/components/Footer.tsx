import React from "react";
import { Dumbbell, Instagram, Facebook, Youtube, Twitter, Heart } from "lucide-react";

export default function Footer() {
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const target = document.querySelector(id);
    if (target) {
      const topOffset = 80;
      const elementPosition = (target as HTMLElement).offsetTop;
      const offsetPosition = elementPosition - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <footer className="bg-[#050505] border-t border-zinc-900 pt-16 pb-8 relative overflow-hidden">
      {/* Decorative Brand Accent Line */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-[#F27D26] to-transparent absolute top-0 left-0 right-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-left">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-zinc-900">
          
          {/* Column 1: Brand details */}
          <div className="md:col-span-4 space-y-4 text-left">
            <a
              href="#home"
              onClick={(e) => handleScrollTo(e, "#home")}
              className="flex items-center gap-2 group w-fit cursor-pointer"
            >
              <div className="w-8 h-8 rounded-lg btn-gradient flex items-center justify-center transition-transform group-hover:rotate-12">
                <Dumbbell className="w-4 h-4 text-black stroke-[3.2]" />
              </div>
              <span className="font-display font-black text-lg tracking-[0.1em] text-white">
                TITAN<span className="text-[#F27D26]">FITNESS</span>
              </span>
            </a>
            
            <p className="text-zinc-500 text-xs leading-relaxed font-light max-w-sm">
              We engineer luxury training grounds. Our club offers premier resistance platforms, IFBB athletic coaching, and biocentric dynamic nutrition. Achieve peak status starting today.
            </p>

            {/* Social icons row */}
            <div className="flex gap-3 pt-2">
              {[
                { icon: <Instagram className="w-4 h-4" />, href: "https://instagram.com" },
                { icon: <Facebook className="w-4 h-4" />, href: "https://facebook.com" },
                { icon: <Youtube className="w-4 h-4" />, href: "https://youtube.com" },
                { icon: <Twitter className="w-4 h-4" />, href: "https://twitter.com" }
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-850 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-brand/10 hover:border-[#F27D26]/20 transition shadow cursor-pointer"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Fast Navigation links */}
          <div className="md:col-span-4 space-y-4 text-left">
            <h4 className="text-xs font-black text-white uppercase tracking-widest">
              Aesthetic Sections
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <a
                href="#home"
                onClick={(e) => handleScrollTo(e, "#home")}
                className="text-zinc-500 hover:text-white transition cursor-pointer"
              >
                Launchpad
              </a>
              <a
                href="#features"
                onClick={(e) => handleScrollTo(e, "#features")}
                className="text-zinc-500 hover:text-white transition cursor-pointer"
              >
                Pillars / Features
              </a>
              <a
                href="#plans"
                onClick={(e) => handleScrollTo(e, "#plans")}
                className="text-zinc-500 hover:text-white transition cursor-pointer"
              >
                Membership Plans
              </a>
              <a
                href="#trainers"
                onClick={(e) => handleScrollTo(e, "#trainers")}
                className="text-zinc-500 hover:text-white transition cursor-pointer"
              >
                Trainer Faculty
              </a>
              <a
                href="#testimonials"
                onClick={(e) => handleScrollTo(e, "#testimonials")}
                className="text-zinc-500 hover:text-white transition cursor-pointer"
              >
                Success Stories
              </a>
              <a
                href="#gallery"
                onClick={(e) => handleScrollTo(e, "#gallery")}
                className="text-zinc-500 hover:text-white transition cursor-pointer"
              >
                Media Compound
              </a>
              <a
                href="#bmi"
                onClick={(e) => handleScrollTo(e, "#bmi")}
                className="text-zinc-500 hover:text-white transition cursor-pointer"
              >
                Index Calculator
              </a>
              <a
                href="#contact"
                onClick={(e) => handleScrollTo(e, "#contact")}
                className="text-zinc-500 hover:text-white transition cursor-pointer"
              >
                Contact & GPS
              </a>
            </div>
          </div>

          {/* Column 3: Direct Response Link */}
          <div className="md:col-span-4 space-y-4 text-xs font-light text-left">
            <h4 className="text-xs font-black text-white uppercase tracking-widest">
              Direct Admissions
            </h4>
            
            <p className="text-zinc-500 leading-relaxed max-w-sm">
              We exclusively handle new memberships applications via phone to maintain discretion. Call us to book your induction today.
            </p>
            
            <a 
              href="tel:+919502858048"
              className="bg-brand/10 p-5 rounded-xl border border-brand/20 flex flex-col justify-center items-start group hover:bg-brand/20 transition-colors cursor-pointer w-full text-left inline-block"
            >
              <span className="text-[10px] uppercase font-bold text-brand tracking-wider mb-1">Admissions Hotline</span>
              <span className="font-black font-display text-2xl text-white tracking-widest group-hover:text-brand transition-colors">+91 9502858048</span>
            </a>
          </div>

        </div>

        {/* Closing details and copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center">
          <span className="text-[10px] text-zinc-500 tracking-widest font-mono uppercase">
            © 2026 TITAN FITNESS PRIVATE LTD. ALL RIGHTS RESERVED.
          </span>
          <span className="text-[10px] text-zinc-600 flex items-center justify-center gap-1">
            Engineered with <Heart className="w-3 h-3 text-[#F27D26] fill-[#F27D26]" /> by Elite Agency Panels.
          </span>
        </div>

      </div>
    </footer>
  );
}
