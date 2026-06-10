import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Activity, Dumbbell, Sparkles, Scale, Info } from "lucide-react";

export default function BMICalculator() {
  const [gender, setGender] = useState<"Male" | "Female">("Male");
  const [height, setHeight] = useState<number>(175); // cm
  const [weight, setWeight] = useState<number>(75); // kg
  const [bmiResult, setBmiResult] = useState<number | null>(null);
  const [bmiCategory, setBmiCategory] = useState<string>("");
  const [bmiAdvice, setBmiAdvice] = useState<string>("");
  const [categoryColor, setCategoryColor] = useState<string>("text-emerald-400");
  const [categoryBg, setCategoryBg] = useState<string>("bg-emerald-500/10 border-emerald-500/20");

  const calculateBMI = (e: React.FormEvent) => {
    e.preventDefault();
    const heightInMeters = height / 100;
    const computedBMI = Number((weight / (heightInMeters * heightInMeters)).toFixed(1));
    setBmiResult(computedBMI);

    // Categories and recommendation rules
    if (computedBMI < 18.5) {
      setBmiCategory("Underweight");
      setCategoryColor("text-sky-400");
      setCategoryBg("bg-sky-500/10 border-sky-500/20");
      setBmiAdvice(
        "Focus on hyper-lean weight gain. Combine high-protein calorie surpluses (aim for 300kcal surplus) with Titan hyper-strength hypertrophy weights. Choose Pro Athlete or Basic Strength tiers."
      );
    } else if (computedBMI >= 18.5 && computedBMI <= 24.9) {
      setBmiCategory("Normal Weight");
      setCategoryColor("text-emerald-400");
      setCategoryBg("bg-emerald-500/10 border-emerald-500/20");
      setBmiAdvice(
        "Excellent biological state. Optimize performance output, vascularity, and endurance goals with our high-intensity CrossFit programs and advanced powerlifting. Pro Athlete tier matches you perfectly."
      );
    } else if (computedBMI >= 25 && computedBMI <= 29.9) {
      setBmiCategory("Overweight");
      setCategoryColor("text-amber-400");
      setCategoryBg("bg-amber-500/10 border-amber-500/20");
      setBmiAdvice(
        "Moderate athletic conditioning needed. Incorporate calorie-deficit macro diet mapping and 3 weekly high-sweat metcon interval systems available inside our Spartan CrossFit arenas."
      );
    } else {
      setBmiCategory("Obese");
      setCategoryColor("text-rose-400");
      setCategoryBg("bg-rose-500/10 border-rose-500/20");
      setBmiAdvice(
        "Accelerate heart and physical durability pivot. We strongly advocate working directly with an IFBB physician to map metabolic-restructuring diets, high-safety exercises, and steady cardio cycles."
      );
    }
  };

  const handleReset = () => {
    setBmiResult(null);
    setBmiCategory("");
    setBmiAdvice("");
  };

  return (
    <section id="bmi" className="py-24 bg-[#050505] relative overflow-hidden">
      {/* Glow particles */}
      <div className="absolute top-[30%] right-[-10%] w-[350px] h-[350px] rounded-full bg-brand/5 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-orange-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Slogan Description panel */}
          <div className="lg:col-span-5 flex flex-col justify-center text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800/80 mb-4 w-fit">
              <Activity className="w-3.5 h-3.5 text-brand" />
              <span className="text-[10px] font-bold tracking-[0.2em] text-brand uppercase">
                Diagnostic Deck
              </span>
            </div>
            
            <h2 className="font-display font-black text-3xl sm:text-5xl text-white uppercase tracking-tight">
              Evaluate school <br /> <span className="text-brand text-brand-gradient">Body Index.</span>
            </h2>
            
            <p className="text-zinc-400 text-sm mt-4 font-light leading-relaxed">
              Calculate your BMI in seconds. Our interactive tool computes physical density coordinates to instantly suggest tailored sports guidelines and gym program fits.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex gap-3 items-start">
                <div className="p-2 bg-brand/10 rounded-lg text-brand mt-1 shrink-0">
                  <Scale className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-white uppercase tracking-wider">Metabolism Assessment</h4>
                  <p className="text-xs text-zinc-400 mt-1 font-light">Your index suggests whether you require a clean hyper-bulking surplus or localized cardiovascular conditioning deficits.</p>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <div className="p-2 bg-brand/10 rounded-lg text-brand mt-1 shrink-0">
                  <Dumbbell className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-white uppercase tracking-wider">Dynamic Recommendations</h4>
                  <p className="text-xs text-zinc-400 mt-1 font-light">Get custom training recommendations matched straight onto your actual muscle density thresholds.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Calculator panel */}
          <div className="lg:col-span-7">
            <div className="glass-panel border-zinc-800/60 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand/5 blur-3xl pointer-events-none rounded-full" />
              <div className="absolute inset-0 dot-grid opacity-[0.06] pointer-events-none" />
              
              {!bmiResult ? (
                <form onSubmit={calculateBMI} className="space-y-6 relative z-10">
                  {/* Gender Tab Selection */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block text-left">Biological Gender</span>
                    <div className="grid grid-cols-2 gap-3">
                      {["Male", "Female"].map((g) => {
                        const isActive = gender === g;
                        return (
                          <button
                            type="button"
                            key={g}
                            onClick={() => setGender(g as "Male" | "Female")}
                            className={`py-3 rounded-xl border text-xs font-black uppercase tracking-wider transition duration-300 cursor-pointer ${
                              isActive
                                ? "bg-brand/10 border-brand text-brand"
                                : "bg-zinc-950/80 border-zinc-900/80 text-zinc-500 hover:text-zinc-300"
                            }`}
                          >
                            {g}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Height Slider Controller */}
                  <div className="space-y-3 bg-zinc-900/55 p-5 rounded-xl border border-zinc-850">
                    <div className="flex justify-between items-baseline">
                      <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Height (Stature)</span>
                      <span className="text-brand font-mono font-bold text-base">{height} <span className="text-xs text-zinc-500 uppercase font-sans">cm</span></span>
                    </div>
                    <input
                      type="range"
                      min="100"
                      max="220"
                      value={height}
                      onChange={(e) => setHeight(Number(e.target.value))}
                      className="w-full accent-[#F27D26] bg-zinc-950 h-1 rounded-lg cursor-pointer"
                    />
                    <div className="flex justify-between text-[9px] font-mono font-bold text-zinc-600 uppercase">
                      <span>100 cm</span>
                      <span>160 cm</span>
                      <span>220 cm</span>
                    </div>
                  </div>

                  {/* Weight Slider Controller */}
                  <div className="space-y-3 bg-zinc-900/55 p-5 rounded-xl border border-zinc-850">
                    <div className="flex justify-between items-baseline">
                      <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Weight (Mass)</span>
                      <span className="text-brand font-mono font-bold text-base">{weight} <span className="text-xs text-zinc-500 uppercase font-sans">kg</span></span>
                    </div>
                    <input
                      type="range"
                      min="30"
                      max="180"
                      value={weight}
                      onChange={(e) => setWeight(Number(e.target.value))}
                      className="w-full accent-[#F27D26] bg-zinc-950 h-1 rounded-lg cursor-pointer"
                    />
                    <div className="flex justify-between text-[9px] font-mono font-bold text-zinc-600 uppercase">
                      <span>30 kg</span>
                      <span>105 kg</span>
                      <span>180 kg</span>
                    </div>
                  </div>

                  {/* Calculate submit trigger */}
                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl btn-gradient font-black uppercase text-xs tracking-widest text-black hover:scale-102 active:scale-98 transition duration-300 shadow-[0_0_20px_rgba(242,125,38,0.25)] cursor-pointer"
                  >
                    Calculate Biological Index
                  </button>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-6 text-center relative z-10"
                >
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block">Calculated Index Matrix</span>
                    
                    {/* Giant index dial rating */}
                    <div className="relative inline-flex items-center justify-center p-6 bg-zinc-950/90 rounded-full w-40 h-40 border border-zinc-850 shadow-inner">
                      <div className="absolute inset-2 bg-gradient-to-br from-brand/5 to-transparent rounded-full shadow-lg" />
                      <div className="text-center relative z-10">
                        <span className="text-4xl font-display font-black text-white">{bmiResult}</span>
                        <span className="text-[10px] font-bold text-brand uppercase tracking-widest block mt-0.5">BMI Index</span>
                      </div>
                    </div>
                  </div>

                  {/* Category Badge container */}
                  <div className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider border max-w-sm mx-auto ${categoryBg} ${categoryColor}`}>
                    {bmiCategory}
                  </div>

                  {/* Custom Coaching instruction text */}
                  <div className="bg-zinc-950/80 text-zinc-400 rounded-xl p-5 border border-zinc-850 text-left relative overflow-hidden">
                    <span className="absolute top-4 right-4 text-zinc-800"><Info className="w-5 h-5" /></span>
                    <h4 className="text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 mb-2">
                      <Sparkles className="w-4 h-4 text-brand" /> Titan Coach Advice
                    </h4>
                    <p className="text-xs leading-relaxed font-light font-sans">{bmiAdvice}</p>
                  </div>

                  {/* Reset trigger */}
                  <div className="pt-2 flex gap-4 max-w-sm mx-auto">
                    <button
                      onClick={handleReset}
                      className="w-1/2 py-3.5 rounded-lg bg-zinc-950 border border-zinc-850 text-zinc-400 hover:text-white hover:border-zinc-700 font-bold uppercase text-[10px] tracking-widest transition cursor-pointer"
                    >
                      Recalculate
                    </button>
                    <a
                      href="tel:+919502858048"
                      className="w-1/2 py-3.5 rounded-lg btn-gradient text-black text-center font-black uppercase text-[10px] tracking-widest hover:bg-brand-hover transition flex items-center justify-center cursor-pointer shadow-[0_0_25px_rgba(242,125,38,0.3)]"
                    >
                      Call to Join
                    </a>
                  </div>
                </motion.div>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
