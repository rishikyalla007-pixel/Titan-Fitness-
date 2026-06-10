import { motion } from "motion/react";
import { Dumbbell, Award, Apple, CalendarRange, Sparkles, TrendingUp, Sparkle } from "lucide-react";
import { FeatureItem } from "../types";

const FEATURES: FeatureItem[] = [
  {
    icon: "Dumbbell",
    title: "State-of-the-Art Bio Equipment",
    description: "Train on computerized Olympic-standard resistance systems, dynamic 3D posture-corrective weight stacks, and premium high-safety heavy barbells.",
    badge: "Futuristic",
    color: "from-orange-500 to-red-600"
  },
  {
    icon: "Award",
    title: "IFBB-Certified Athletic Coaches",
    description: "Our trainers are certified bodybuilding masters, physical rehabilitation experts, and sports psychologists dedicated to your progress.",
    badge: "1-on-1 Guidance",
    color: "from-yellow-500 to-amber-600"
  },
  {
    icon: "Apple",
    title: "Macro-Mapped Nutritional Diet Rigs",
    description: "Receive custom nutrition blueprints dynamically matched to your physical metabolism, weight targets, and daily lifestyle constraints.",
    badge: "Biocentric",
    color: "from-green-500 to-emerald-600"
  },
  {
    icon: "CalendarRange",
    title: "Dynamic & Fluid Memberships",
    description: "Freeze plans seamlessly when traveling, utilize universal entry access cards, and take advantage of transparent pricing with zero startup fees.",
    badge: "Flexible Contracts",
    color: "from-blue-500 to-indigo-600"
  }
];

export default function Features() {
  // Helper to render lucide component based on string literal
  const renderIcon = (name: string) => {
    switch (name) {
      case "Dumbbell":
        return <Dumbbell className="w-8 h-8 text-white relative z-10" />;
      case "Award":
        return <Award className="w-8 h-8 text-white relative z-10" />;
      case "Apple":
        return <Apple className="w-8 h-8 text-white relative z-10" />;
      case "CalendarRange":
        return <CalendarRange className="w-8 h-8 text-white relative z-10" />;
      default:
        return <Dumbbell className="w-8 h-8 text-white relative z-10" />;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 80, damping: 15 }
    }
  };

  return (
    <section id="features" className="py-24 bg-[#050505] relative overflow-hidden dotted-background">
      {/* Visual background details */}
      <div className="absolute top-[10%] right-[5%] w-[300px] h-[300px] rounded-full bg-brand/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[5%] w-[250px] h-[250px] rounded-full bg-white/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2.5xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900/80 border border-zinc-800/80 mb-4">
            <Sparkle className="w-3.5 h-3.5 text-brand" />
            <span className="text-[10px] font-bold tracking-[0.2em] text-brand/90 uppercase">
              The Titan Methodology
            </span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-white uppercase tracking-tight">
            We Set Personal <span className="text-brand text-brand-gradient">Standards.</span>
          </h2>
          <p className="text-zinc-400 text-sm mt-3.5 font-light leading-relaxed">
            Titan is not just a gym. It is an engineering compound for your physique. Discover how our professional setups, specialized nutrition, and expert coaches elevate your results.
          </p>
        </div>

        {/* Features Card Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {FEATURES.map((feature, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="glass-panel rounded-3xl p-8 relative overflow-hidden group border border-zinc-800/50 hover:border-brand/35 transition-all duration-300 shadow-xl"
            >
              {/* Highlight background radial trail & micro dots */}
              <div className="absolute inset-0 dot-grid opacity-[0.12] group-hover:opacity-20 transition-opacity pointer-events-none" />
              <div className="absolute -inset-px bg-gradient-to-br from-brand/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none" />
              
              <div className="flex flex-col sm:flex-row gap-6 items-start relative z-10">
                {/* Icon wrapper badge */}
                <div className={`p-4 rounded-xl relative overflow-hidden shrink-0`}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-20 group-hover:opacity-40 transition-opacity duration-300`} />
                  <div className={`absolute -inset-2 bg-gradient-to-br ${feature.color} blur-[12px] opacity-10 group-hover:opacity-30 transition-opacity duration-300`} />
                  {renderIcon(feature.icon)}
                </div>

                {/* Text attributes */}
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h3 className="font-display font-black text-lg text-white uppercase tracking-wider group-hover:text-brand transition-colors duration-300">
                      {feature.title}
                    </h3>
                    {feature.badge && (
                      <span className="text-[9px] font-black text-brand bg-brand/10 border border-brand/20 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                        {feature.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-zinc-400 text-sm leading-relaxed font-light text-left">
                    {feature.description}
                  </p>
                </div>
              </div>

              {/* Graphical ambient line corner */}
              <div className="absolute bottom-0 right-0 w-16 h-[2px] bg-gradient-to-r from-transparent to-brand/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </motion.div>

        {/* Feature Bottom call-out tagline */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-4 glass-panel border border-zinc-800 px-6 py-4 rounded-2xl max-w-2xl mx-auto">
            <div className="flex items-center gap-2 text-brand">
              <TrendingUp className="w-5 h-5" />
              <span className="font-bold uppercase font-display text-xs tracking-wider">Join 1,200+ members hitting weekly PRs</span>
            </div>
            <span className="hidden sm:inline text-zinc-600">|</span>
            <p className="text-xs text-zinc-400 font-light">
              Complimentary introductory induction tour and biometric analysis included with every plan.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
