import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ArrowRight, Trophy, Users, Shield, ArrowDown } from "lucide-react";

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTo = (id: string) => {
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 20 },
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-[95vh] flex items-center justify-center pt-24 pb-16 overflow-hidden bg-[#050505] dot-grid"
    >
      {/* Background Graphic Asset */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop"
          alt="Titan Fitness Elite Training Complex"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover opacity-20 object-center scale-115 will-change-transform"
          style={{ transform: `translate3d(0, ${scrollY * 0.18}px, 0)` }}
        />
        {/* Layer Gradients to keep dark readability premium */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/40 to-transparent" />
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#050505] to-transparent" />
      </div>

      {/* Floating Ambient Glow */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-orange-600/10 blur-[130px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] rounded-full bg-brand/5 blur-[120px] pointer-events-none z-0" />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Main Copy (Bento Main Cell style) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-8 flex flex-col items-start space-y-6 glass-panel rounded-3xl p-6 sm:p-10 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-full h-full dot-grid opacity-30 pointer-events-none" />
            <div className="relative z-10 flex flex-col items-start space-y-6">
              {/* Visual Mini Badge */}
              <motion.div
                variants={itemVariants}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-brand/10 border border-brand/20"
              >
                <Trophy className="w-3.5 h-3.5 text-brand" />
                <span className="text-[10px] font-bold tracking-[0.25em] text-brand uppercase italic">
                  Est. 2024 • Elite Level Titan Complex
                </span>
              </motion.div>

              {/* Dynamic Slogan Heading */}
              <motion.h1
                variants={itemVariants}
                className="font-display font-black text-4.5xl sm:text-6.5xl lg:text-7xl leading-[0.95] tracking-tighter text-white uppercase text-left"
              >
                Transform <br /> Your <span className="text-brand-gradient">Body.</span> <br />
                Transform Your <span className="text-white border-b-4 border-brand/40">Life.</span>
              </motion.h1>

              {/* Subheading */}
              <motion.p
                variants={itemVariants}
                className="text-zinc-400 font-sans text-sm sm:text-base leading-relaxed max-w-xl font-light text-left"
              >
                Unlock your physical potential with our world-class facilities and expert guidance. 
                Step into Delhi's premium high-performance laboratory designed for those who prioritize output over comfort.
              </motion.p>

              {/* Micro Badges Points */}
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap gap-x-6 gap-y-2 pt-2 text-zinc-300 text-xs font-semibold"
              >
                <div className="flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-brand" />
                  <span>Futuristic Bio-Metrics Equipment</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-brand" />
                  <span>Certified Elite Coach Panel</span>
                </div>
              </motion.div>

              {/* Interactive Call-To-Action buttons */}
              <motion.div
                variants={itemVariants}
                className="w-full sm:w-auto flex flex-col sm:flex-row gap-4 pt-4"
              >
                <a
                  href="tel:+919502858048"
                  className="btn-gradient px-12 py-4 flex items-center justify-center gap-2 rounded-xl text-black font-black text-xs uppercase tracking-widest hover:scale-103 active:scale-97 transition duration-300 shadow-[0_0_25px_rgba(242,125,38,0.35)] cursor-pointer"
                >
                  Call Now
                </a>
              </motion.div>
            </div>
          </motion.div>

          {/* Quick Metrics Overlay Widget */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 80, delay: 0.5 }}
            className="lg:col-span-4 self-stretch flex flex-col justify-between"
          >
            <div className="glass-panel rounded-3xl p-8 relative flex-1 flex flex-col justify-between overflow-hidden shadow-2xl border border-zinc-800/60">
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand/10 blur-2xl rounded-full" />
              
              <div>
                <h3 className="font-display font-black text-xs text-zinc-500 mb-6 uppercase tracking-widest border-b border-zinc-800 pb-2">
                  TITAN PERFORMANCE LOGISTICS
                </h3>

                <div className="space-y-6">
                  {[
                    { value: "5000+", label: "Elite Club Members", percentage: 95 },
                    { value: "25+", label: "Certified Expert Trainers", percentage: 85 },
                    { value: "10+", label: "Years Premium Experience", percentage: 90 }
                  ].map((stat, idx) => (
                    <div key={idx} className="space-y-2">
                      <div className="flex justify-between items-baseline text-left">
                        <span className="text-zinc-400 text-xs font-semibold">{stat.label}</span>
                        <span className="text-brand font-mono font-bold text-sm tracking-wide">{stat.value}</span>
                      </div>
                      <div className="h-[3px] bg-zinc-900 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${stat.percentage}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, delay: idx * 0.1 }}
                          className="h-full btn-gradient"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Decorative Brand Accent bar */}
              <div className="h-[3px] bg-[#F27D26] absolute bottom-0 left-0 right-0" />
            </div>
          </motion.div>
        </div>

        {/* Scroll cues button */}
        <div className="flex justify-center mt-12 sm:mt-16">
          <motion.button
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            onClick={() => handleScrollTo("#features")}
            className="p-3 bg-zinc-900 border border-zinc-800 rounded-full text-zinc-400 hover:text-white hover:border-zinc-700 transition shadow-[0_0_15px_rgba(0,0,0,0.5)] cursor-pointer"
            aria-label="Scroll Down"
          >
            <ArrowDown className="w-4 h-4" />
          </motion.button>
        </div>

      </div>
    </section>
  );
}
