import { motion } from "motion/react";
import { PhoneCall } from "lucide-react";

export default function FloatingCallButton() {
  const phoneNumberUrl = "tel:+919502858048";

  return (
    <div className="fixed bottom-24 right-6 z-40 hidden lg:block">
      <motion.a
        href={phoneNumberUrl}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="relative flex items-center justify-center w-14 h-14 rounded-full bg-brand text-black shadow-[0_4px_20px_rgba(242,125,38,0.4)] hover:bg-[#ff8933] transition-colors duration-300 cursor-pointer"
        aria-label="Call Us Now"
      >
        {/* Animated outer pulse rings */}
        <span className="absolute inset-0 rounded-full bg-brand opacity-40 animate-ping pointer-events-none" style={{ animationDuration: '2s' }} />
        <span className="absolute -inset-1 rounded-full border-2 border-brand opacity-25 animate-pulse pointer-events-none" />

        <PhoneCall className="w-5 h-5 fill-black stroke-black stroke-[1.5]" />

        {/* Hover label micro-badge */}
        <span className="absolute right-16 bg-zinc-950 text-brand text-[10px] tracking-widest font-black uppercase py-1.5 px-3 rounded-lg border border-brand/20 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap shadow-xl">
          Call Admissions
        </span>
      </motion.a>
    </div>
  );
}
