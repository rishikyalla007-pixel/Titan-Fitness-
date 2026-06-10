import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Sparkles, ArrowRight, Activity, Flame, Heart, TrendingUp } from "lucide-react";

interface Transformation {
  name: string;
  type: string;
  beforeImg: string;
  afterImg: string;
  beforeStats: string;
  afterStats: string;
  period: string;
  achievement: string;
}

const TRANSFORMATIONS: Transformation[] = [
  {
    name: "Kabir Sen",
    type: "Muscle Hypertrophy",
    beforeImg: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=600&auto=format&fit=crop",
    afterImg: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=600&auto=format&fit=crop",
    beforeStats: "68 kg (11% BF)",
    afterStats: "81 kg (9% BF)",
    period: "16 Weeks",
    achievement: "+13kg Lean Muscle"
  },
  {
    name: "Priya Sharma",
    type: "Fat Loss & Conditioning",
    beforeImg: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=600&auto=format&fit=crop",
    afterImg: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=600&auto=format&fit=crop",
    beforeStats: "78 kg (32% BF)",
    afterStats: "59 kg (19% BF)",
    period: "12 Weeks",
    achievement: "-19kg Weight Melt"
  },
  {
    name: "Aarav Goel",
    type: "Body Recomposition",
    beforeImg: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=600&auto=format&fit=crop",
    afterImg: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=600&auto=format&fit=crop",
    beforeStats: "94 kg (28% BF)",
    afterStats: "82 kg (12% BF)",
    period: "20 Weeks",
    achievement: "-12kg Fat, +6kg Muscle"
  }
];

export default function TransformationGallery() {
  const [activeTab, setActiveTab] = useState<number>(0);
  
  // Real-time animated counter values
  const [fatCounter, setFatCounter] = useState(0);
  const [muscleCounter, setMuscleCounter] = useState(0);
  const [livesCounter, setLivesCounter] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepTime = Math.floor(duration / steps);
    
    let currentStep = 0;
    
    interval = setInterval(() => {
      currentStep++;
      if (currentStep <= steps) {
        setFatCounter(Math.floor((1240 / steps) * currentStep));
        setMuscleCounter(Math.floor((850 / steps) * currentStep));
        setLivesCounter(Math.floor((5000 / steps) * currentStep));
      } else {
        setFatCounter(1240);
        setMuscleCounter(850);
        setLivesCounter(5000);
        clearInterval(interval);
      }
    }, stepTime);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="transformations" className="py-24 bg-[#050505] relative overflow-hidden">
      {/* Background radial details */}
      <div className="absolute top-[30%] left-[-10%] w-[420px] h-[420px] rounded-full bg-brand/5 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[380px] h-[380px] rounded-full bg-orange-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center">
        {/* Section Header */}
        <div className="max-w-2.5xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-805 mb-4">
            <Flame className="w-3.5 h-3.5 text-brand" />
            <span className="text-[10px] font-bold tracking-[0.25em] text-brand uppercase">
              Transformation Gallery
            </span>
          </div>
          <h2 className="font-display font-black text-3.5xl sm:text-5xl text-white uppercase tracking-tight">
            Proof in <span className="text-brand text-brand-gradient">Performance.</span>
          </h2>
          <p className="text-zinc-400 text-sm mt-3.5 font-light leading-relaxed">
            Real physical restructuring through scientific program design. Select our premium member transformation case files below.
          </p>
        </div>

        {/* Dynamic Animated Counter Bento block */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            { metric: `${fatCounter.toLocaleString()} kg`, label: "Fats Obliterated", icon: <Flame className="w-5 h-5 text-brand" />, desc: "Total fat loss achieved by Delhi members since 10 years" },
            { metric: `${muscleCounter.toLocaleString()} kg`, label: "Pure Muscle Synthesized", icon: <Activity className="w-5 h-5 text-brand" />, desc: "Lean mass accreted by customized bio-centric protocols" },
            { metric: `${livesCounter.toLocaleString()}+`, label: "Lives Empowered", icon: <TrendingUp className="w-5 h-5 text-brand" />, desc: "Verified milestone accomplishments achieved with custom training" }
          ].map((c, idx) => (
            <div key={idx} className="glass-panel border-zinc-850 bg-zinc-950/40 p-6 rounded-2xl relative overflow-hidden flex flex-col justify-between text-left">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">TITAN DATA CORE</span>
                <div className="p-2.5 bg-zinc-900 rounded-xl border border-zinc-850 text-brand">
                  {c.icon}
                </div>
              </div>
              <div>
                <strong className="text-4xl font-display font-black text-white tracking-tight leading-none block mb-1">
                  {c.metric}
                </strong>
                <span className="text-sm font-bold text-zinc-300 block mb-1.5">{c.label}</span>
                <p className="text-zinc-500 text-[11px] leading-relaxed font-light">{c.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Real life transformation cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {TRANSFORMATIONS.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              whileHover={{ y: -8 }}
              className="glass-panel rounded-3xl overflow-hidden border border-zinc-850 bg-zinc-950/70 p-6 flex flex-col justify-between transition-all shadow-xl"
            >
              <div>
                {/* Images Container */}
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] mb-5 border border-zinc-850 group">
                  <div className="absolute inset-0 grid grid-cols-2 gap-0.5">
                    {/* Before frame */}
                    <div className="relative h-full overflow-hidden">
                      <img src={t.beforeImg} alt="Before state" className="w-full h-full object-cover grayscale opacity-75 group-hover:scale-105 transition-transform duration-500" />
                      <span className="absolute bottom-3 left-3 bg-zinc-950/90 text-[9px] font-mono tracking-widest uppercase text-zinc-400 px-2 py-1 rounded">BEFORE</span>
                    </div>
                    {/* After frame */}
                    <div className="relative h-full overflow-hidden">
                      <img src={t.afterImg} alt="After state" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <span className="absolute bottom-3 right-3 bg-brand text-zinc-950 text-[9px] font-black tracking-widest uppercase px-2 py-1 rounded">AFTER</span>
                    </div>
                  </div>
                </div>

                <div className="text-left space-y-1.5 mb-6">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-display font-black text-white text-lg tracking-wider uppercase">{t.name}</h3>
                    <span className="text-[10px] font-bold text-brand uppercase tracking-wider">{t.period}</span>
                  </div>
                  <p className="text-[10px] font-mono tracking-widest text-[#F27D26] uppercase">{t.type}</p>
                  
                  {/* Performance Bracket Detail */}
                  <div className="bg-zinc-900 border border-zinc-850 py-2.5 px-3.5 rounded-xl flex justify-between text-xs mt-4">
                    <div>
                      <span className="text-[9px] text-zinc-500 uppercase block leading-none mb-1">Before Profile</span>
                      <span className="text-zinc-300 font-mono font-medium">{t.beforeStats}</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-zinc-500 uppercase block leading-none mb-1">After Profile</span>
                      <span className="text-white font-mono font-bold">{t.afterStats}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-brand/10 to-transparent border border-brand/20 rounded-xl p-3 text-left">
                <span className="text-[9px] font-mono tracking-widest text-brand uppercase block mb-0.5">ESTABLISHED GOAL INDEX</span>
                <strong className="text-sm font-semibold text-white">{t.achievement}</strong>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
