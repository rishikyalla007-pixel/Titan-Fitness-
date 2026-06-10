import { motion } from "motion/react";
import { Star, MessageSquareCode, Quote } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  stars: number;
  review: string;
  image: string;
}

const TESTIMONIALS_DATA: Testimonial[] = [
  {
    name: "Aanya Verma",
    role: "National Powerlifter",
    stars: 5,
    review: "The Titan strength compounds are completely unmatched. Utilizing their heavy-caliber mechanical equipment and biomechanics coaching helped me push my squat from 110kg to an official registered 165kg. The hyper-recovery suite is truly world-class.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop"
  },
  {
    name: "Vikram Malhotra",
    role: "Hedge Fund Principal",
    stars: 5,
    review: "As someone with a 14-hour workday, the dedicated trainer support keeps my physical index at its highest. When traveling across time-zones, they adjust my exercises and guide my dining macros in real-time. I hit my peak physical condition at age 42.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"
  },
  {
    name: "Rohan Advani",
    role: "Founder, TechScale",
    stars: 5,
    review: "Titan is the ultimate turning point for executive health in Delhi. The facility is clinically clean, the coaching staff is phenomenally well-read in nutritional bio-markers, and the steam rooms feel exceptionally luxury. Highly recommended.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop"
  },
  {
    name: "Meera Sen",
    role: "Classical Dancer & Choreographer",
    stars: 5,
    review: "The focus on scientific joint-mobility and compound dynamic strength matches perfectly with my requirements. The trainers respect recovery time and make sure that we operate with maximum biomechanical output.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop"
  },
  {
    name: "Gaurav Malhotra",
    role: "Senior Orthopedic Surgeon",
    stars: 5,
    review: "As a health professional, I am extremely demanding when it comes to workout biomechanics. The certified athletic trainers at Titan Fitness understand exercise physiology profoundly well. No standard gym-tier advice here.",
    image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=200&auto=format&fit=crop"
  },
  {
    name: "Neha Goel",
    role: "Vinyasa Flow Lead Instructor",
    stars: 5,
    review: "Stunning environment, precise air conditioning systems, and state-of-the-art weights. Titan Fitness manages to cultivate a hardcore training mentality while offering elite, premium lifestyle luxury.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"
  }
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-[#050505] relative overflow-hidden">
      {/* Background Graphic Accents */}
      <div className="absolute top-[20%] right-[-10%] w-[380px] h-[380px] rounded-full bg-brand/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-15%] w-[350px] h-[350px] rounded-full bg-orange-600/5 blur-[110px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center">
        {/* Section Header */}
        <div className="max-w-2.5xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-850 mb-4">
            <MessageSquareCode className="w-3.5 h-3.5 text-brand" />
            <span className="text-[10px] font-bold tracking-[0.25em] text-brand uppercase">
              Elite Testimonials
            </span>
          </div>
          <h2 className="font-display font-black text-3.5xl sm:text-5xl text-white uppercase tracking-tight">
            Our Members <span className="text-brand text-brand-gradient">Validate.</span>
          </h2>
          <p className="text-zinc-400 text-sm mt-3.5 font-light leading-relaxed">
            Discover what Delhi's premier corporate leaders, doctors, and competitive athletes are saying about their Titan transformations.
          </p>
        </div>

        {/* Testimonials Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS_DATA.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05, duration: 0.4 }}
              whileHover={{ y: -6, scale: 1.01 }}
              className="glass-panel border-zinc-800/40 bg-zinc-950/45 backdrop-blur-xl rounded-3xl p-6 relative overflow-hidden flex flex-col justify-between text-left group shadow-lg"
            >
              <div className="absolute inset-0 dot-grid opacity-[0.05] pointer-events-none" />
              
              <div className="relative z-10">
                {/* Quote outline badge */}
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-0.5">
                    {[...Array(t.stars)].map((_, sIdx) => (
                      <Star key={sIdx} className="w-3.5 h-3.5 fill-brand stroke-brand" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-zinc-900 group-hover:text-brand/10 transition-colors duration-300" />
                </div>

                <p className="text-zinc-300 font-sans text-xs leading-relaxed font-light italic mb-8">
                  "{t.review}"
                </p>
              </div>

              {/* Profile Details layout */}
              <div className="flex items-center gap-3.5 mt-auto pt-5 border-t border-zinc-900/80 relative z-10">
                <img
                  src={t.image}
                  alt={t.name}
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-full object-cover shrink-0 border border-zinc-805"
                />
                <div>
                  <h4 className="font-display font-black text-white text-xs tracking-wider uppercase leading-none">{t.name}</h4>
                  <span className="text-[9px] text-[#F27D26] font-mono tracking-widest uppercase mt-1 block">
                    {t.role}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
