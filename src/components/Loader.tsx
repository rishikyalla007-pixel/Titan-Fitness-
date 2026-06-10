import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Dumbbell } from "lucide-react";

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + Math.floor(Math.random() * 8) + 4;
      });
    }, 80);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-[#09090b] z-50 flex flex-col items-center justify-center">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,77,0,0.08)_0%,transparent_70%)]" />
      
      <div className="relative text-center flex flex-col items-center">
        {/* Animated Dumbbell Logo */}
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            rotate: [0, 360],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-20 h-20 rounded-full bg-brand/10 flex items-center justify-center border border-brand/20 mb-6 shadow-[0_0_40px_rgba(255,77,0,0.15)]"
        >
          <Dumbbell className="w-10 h-10 text-brand" />
        </motion.div>

        {/* Brand Text */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="font-display font-bold text-4xl tracking-[0.25em] text-white uppercase"
        >
          TITAN<span className="text-brand">FITNESS</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 0.6 }}
          className="text-xs text-zinc-400 tracking-[0.4em] uppercase mt-2"
        >
          Engineering Peak Performance
        </motion.p>

        {/* Progress Bar Container */}
        <div className="w-64 h-[2px] bg-zinc-800 rounded-full mt-10 overflow-hidden relative border border-zinc-900">
          <motion.div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-brand to-orange-400 shadow-[0_0_12px_rgba(255,77,0,0.5)]"
            initial={{ width: "0%" }}
            animate={{ width: `${Math.min(progress, 100)}%` }}
            transition={{ ease: "easeInOut" }}
          />
        </div>

        {/* Progress Percent */}
        <motion.span
          className="text-[10px] font-mono text-brand mt-2 tracking-widest font-semibold"
        >
          {Math.min(progress, 100)}%
        </motion.span>
      </div>
    </div>
  );
}
