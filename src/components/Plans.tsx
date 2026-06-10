import React, { useState } from "react";
import { motion } from "motion/react";
import { Check, Flame, Phone, Sparkles } from "lucide-react";
import { PlanItem } from "../types";

const PLANS: PlanItem[] = [
  {
    id: "basic",
    name: "Basic",
    price: "999",
    period: "mo",
    description: "Perfect for casual lifters seeking top-quality weights and a reliable community.",
    popular: false,
    features: [
      "Access to universal weights arena",
      "Locker room & Finnish steam sauna",
      "Premium cardio zone access",
      "High-speed WiFi & locker accessibility",
      "2 session guidelines with coaching team/mo"
    ],
    badge: "Essential Level"
  },
  {
    id: "pro",
    name: "Pro",
    price: "1999",
    period: "mo",
    description: "Tailored for committed enthusiasts looking to push physical boundaries.",
    popular: true,
    features: [
      "Everything in Basic included",
      "Universal global entry to 18+ clubs",
      "Unlimited premium CrossFit arenas",
      "3 1-on-1 private coaching sessions/mo",
      "Custom bio-centric nutrition blueprints",
      "Free guest passes (2 per month)"
    ],
    badge: "Popular Value"
  },
  {
    id: "elite",
    name: "Elite",
    price: "2999",
    period: "mo",
    description: "The ultimate hyper-performance level with zero limitations or compromises.",
    popular: false,
    features: [
      "Everything in Pro included",
      "Unlimited 1-on-1 private master sessions",
      "Hyper-recovery cold plunge & oxygen bar",
      "24/7 real-time coach access via WhatsApp",
      "Dedicated premium VIP personal suite lockbox",
      "Complimentary pre-workout wellness fuel",
      "Exclusive Titan athletic merch gear set"
    ],
    badge: "Champion Tier"
  }
];

export default function Plans() {
  const [isAnnual, setIsAnnual] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PlanItem | null>(null);
  const [isBooked, setIsBooked] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", tc: false });

  const handlePriceToggle = () => {
    setIsAnnual(!isAnnual);
  };

  const getPrice = (basePrice: string) => {
    const rawNum = parseInt(basePrice);
    if (isAnnual) {
      // 20% discount on monthly equivalent
      const discounted = Math.floor(rawNum * 0.8);
      return discounted.toLocaleString("en-IN");
    }
    return rawNum.toLocaleString("en-IN");
  };

  const handleOpenModal = (plan: PlanItem) => {
    setSelectedPlan(plan);
    setFormData({ name: "", email: "", phone: "", tc: false });
    setIsBooked(false);
  };

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) return;
    setIsBooked(true);
  };

  return (
    <section id="plans" className="py-24 bg-[#050505] relative overflow-hidden">
      {/* Background Graphic elements */}
      <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-brand/5 blur-[160px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-orange-500/5 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Section Header */}
        <div className="text-center max-w-2.5xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900/80 border border-zinc-800/80 mb-4 animate-pulse">
            <Flame className="w-3.5 h-3.5 text-brand" />
            <span className="text-[10px] font-bold tracking-[0.2em] text-brand uppercase">
              Flexible Memberships
            </span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-white uppercase tracking-tight">
            Select Your <span className="text-brand text-brand-gradient">Battle Level.</span>
          </h2>
          <p className="text-zinc-400 text-sm mt-3.5 font-light leading-relaxed">
            Transparent investment for elite physique development. Choose from our tiered athletic structures and save up to 20% by committing yearly.
          </p>

          {/* Pricing Switcher Control Toggle */}
          <div className="flex items-center justify-center gap-4 mt-10">
            <span className={`text-xs font-bold uppercase tracking-wider transition-colors duration-300 ${!isAnnual ? "text-white" : "text-zinc-500"}`}>
              Monthly
            </span>
            
            <button
              onClick={handlePriceToggle}
              className="relative w-16 h-8 rounded-full bg-zinc-900 border border-zinc-800 p-1 flex items-center cursor-pointer transition-colors hover:border-brand/30"
              aria-label="Toggle annual pricing"
            >
              <motion.div
                layout
                className="w-6 h-6 rounded-full bg-brand shadow-[0_0_10px_rgba(255,77,0,0.4)]"
                animate={{ x: isAnnual ? 32 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </button>

            <span className={`text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors duration-300 ${isAnnual ? "text-white" : "text-zinc-500"}`}>
              Annual Saving
              <span className="text-[9px] font-extrabold text-white bg-brand px-2.5 py-0.5 rounded-full tracking-widest uppercase">
                -20% OFF
              </span>
            </span>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch pt-4">
          {PLANS.map((plan, idx) => {
            const hasGlowBorder = plan.popular;
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ type: "spring", stiffness: 80, damping: 20, delay: idx * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className={`rounded-3xl relative flex flex-col p-8 justify-between shadow-2xl overflow-hidden transition-all duration-300 border ${
                  hasGlowBorder
                    ? "glass-panel-glow border-brand/40"
                    : "glass-panel border-zinc-800/50"
                }`}
              >
                {/* Visual badge highlight for pro card */}
                {plan.popular && (
                  <div className="absolute top-0 right-0 btn-gradient text-zinc-950 text-[9px] font-black tracking-widest uppercase px-5 py-1.5 rounded-bl-xl shadow-md flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 fill-zinc-950" />
                    RECOMMENDED
                  </div>
                )}

                {/* Ambient dot matrix inside cells */}
                <div className="absolute inset-0 dot-grid opacity-[0.08] pointer-events-none" />

                <div className="relative z-10">
                  {/* Plan Hierarchy and badge */}
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[10px] font-bold text-brand uppercase tracking-[0.2em] italic">
                      {plan.badge}
                    </span>
                  </div>

                  <h3 className="font-display font-black text-2.5xl text-white uppercase tracking-wider mb-2">
                    {plan.name}
                  </h3>
                  
                  <p className="text-zinc-400 text-xs leading-relaxed font-light mb-6 text-left">
                    {plan.description}
                  </p>

                  {/* Pricing dynamic details */}
                  <div className="flex items-baseline mb-6 border-b border-zinc-800/65 pb-6">
                    <span className="text-[#F27D26] font-sans text-lg font-black">₹</span>
                    <span className="text-white font-display font-black text-5xl tracking-tighter transition-all duration-300">
                      {getPrice(plan.price)}
                    </span>
                    <span className="text-zinc-500 font-sans text-xs ml-2 font-medium">
                      / {isAnnual ? "month (billed annually)" : "month"}
                    </span>
                  </div>

                  {/* Features lists */}
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-3">
                        <div className="p-0.5 rounded-full bg-brand/10 border border-brand/20 mt-0.5">
                          <Check className="w-3.5 h-3.5 text-brand" />
                        </div>
                        <span className="text-zinc-300 text-xs font-normal text-left">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Primary booking button */}
                <a
                  href="tel:+919502858048"
                  className={`w-full py-4 flex items-center justify-center gap-2 rounded-xl font-black uppercase text-xs tracking-widest transition-all duration-300 scale-100 hover:scale-103 active:scale-97 cursor-pointer relative z-10 ${
                    plan.popular
                      ? "btn-gradient text-black shadow-[0_0_20px_rgba(242,125,38,0.25)] border-0"
                      : "bg-zinc-900/80 border border-zinc-800 hover:bg-zinc-850 text-white"
                  }`}
                >
                  <Phone className={`w-4 h-4 ${plan.popular ? "text-black" : "text-brand"}`} />
                  Call to Join
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
