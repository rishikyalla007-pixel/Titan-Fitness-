import { motion } from "motion/react";
import { Award, Instagram, Twitter, Linkedin, Sparkles, Trophy } from "lucide-react";
import { TrainerItem } from "../types";

const TRAINERS: TrainerItem[] = [
  {
    name: "Marcus Thorne",
    role: "IFBB Pro & Chief Sculptor",
    specialty: "High-Response Hypertrophy & Contest Preparation",
    experience: "12+ Years Competitive",
    image: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=600&auto=format&fit=crop",
    socials: {
      instagram: "https://instagram.com",
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com"
    },
    stats: [
      { label: "Elite Transformations", value: "950+" },
      { label: "Pro Card Mentored", value: "14" }
    ]
  },
  {
    name: "Elena Rostova",
    role: "Olympic Strength Master",
    specialty: "High-Load Biomechanics & Neurokinetic Recovery",
    experience: "8+ Years Olympic Coach",
    image: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?q=80&w=600&auto=format&fit=crop",
    socials: {
      instagram: "https://instagram.com",
      linkedin: "https://linkedin.com"
    },
    stats: [
      { label: "Athletes Conditioned", value: "480+" },
      { label: "Powerlifting Golds", value: "9" }
    ]
  },
  {
    name: "Devon Carter",
    role: "CrossFit & Athletics Specialist",
    specialty: "High-Intensity Metabolic Drills & Agile Plyometrics",
    experience: "9+ Years Performance Coaching",
    image: "https://images.unsplash.com/photo-1507398941214-572c25f4b1dc?q=80&w=600&auto=format&fit=crop",
    socials: {
      instagram: "https://instagram.com",
      twitter: "https://twitter.com"
    },
    stats: [
      { label: "Combat & Agility clients", value: "620+" },
      { label: "Marathon Credits", value: "11" }
    ]
  }
];

export default function Trainers() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 70, damping: 15 }
    }
  };

  return (
    <section id="trainers" className="py-24 bg-[#050505] relative overflow-hidden">
      {/* Graphic background highlights */}
      <div className="absolute top-[30%] left-[-10%] w-[400px] h-[400px] rounded-full bg-brand/5 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[350px] h-[350px] rounded-full bg-orange-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800/80 mb-4">
              <Trophy className="w-3.5 h-3.5 text-brand" />
              <span className="text-[10px] font-bold tracking-[0.2em] text-brand uppercase">
                Titan Faculty
              </span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-white uppercase tracking-tight">
              Elite <span className="text-brand text-brand-gradient">Guides</span> at your disposal.
            </h2>
            <p className="text-zinc-400 text-sm mt-3.5 font-light leading-relaxed">
              Work with IFBB Pro competitors, sports physiotherapists, and elite strength coaches who design structured workout programs custom fitted to your metabolic pace.
            </p>
          </div>

          <div className="flex gap-4">
            <div className="bg-zinc-900/60 border border-zinc-850 px-5 py-3 rounded-xl flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-[#F27D26] animate-ping" />
              <span className="text-xs text-zinc-300 font-medium">Coaches Available Live 1-on-1 Slots</span>
            </div>
          </div>
        </div>

        {/* Trainers Cards grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {TRAINERS.map((trainer, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="glass-panel rounded-3xl overflow-hidden group relative border border-zinc-800/50 flex flex-col justify-between shadow-2xl h-[520px]"
            >
              {/* Subtle inner bento details */}
              <div className="absolute inset-0 dot-grid opacity-[0.06] pointer-events-none" />

              {/* Card Image Block with Dark Gradient Overlay */}
              <div className="relative w-full h-[62%] overflow-hidden bg-zinc-950">
                <img
                  src={trainer.image}
                  alt={trainer.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/20 to-transparent" />
                
                {/* Floating Experience Badge */}
                <span className="absolute top-4 left-4 text-[9px] font-black text-black btn-gradient px-3 py-1.5 rounded-lg uppercase tracking-wider shadow-md">
                  {trainer.experience}
                </span>

                {/* Social Connect Triggers sliding on hover */}
                <div className="absolute bottom-4 right-4 flex flex-col gap-2 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  {trainer.socials.instagram && (
                    <a
                      href={trainer.socials.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-lg bg-zinc-950 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-brand/10 hover:border-brand/30 transition shadow-lg"
                      title="Follow on Instagram"
                    >
                      <Instagram className="w-4 h-4" />
                    </a>
                  )}
                  {trainer.socials.twitter && (
                    <a
                      href={trainer.socials.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-lg bg-zinc-950 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-brand/10 hover:border-brand/30 transition shadow-lg"
                      title="Connect on Twitter"
                    >
                      <Twitter className="w-4 h-4" />
                    </a>
                  )}
                  {trainer.socials.linkedin && (
                    <a
                      href={trainer.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-lg bg-zinc-950 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-brand/10 hover:border-brand/30 transition shadow-lg"
                      title="Connect on LinkedIn"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>

              {/* Card Meta Content Block */}
              <div className="p-6 flex flex-col justify-between grow relative z-10">
                <div>
                  <span className="text-[10px] font-bold text-[#F27D26] uppercase tracking-wider block mb-1">
                    {trainer.role}
                  </span>
                  
                  <h3 className="font-display font-black text-xl text-white uppercase tracking-wider group-hover:text-brand transition-colors duration-300">
                    {trainer.name}
                  </h3>

                  <p className="text-zinc-400 text-xs font-light mt-2 line-clamp-2 leading-relaxed text-left">
                    <strong>Focus:</strong> {trainer.specialty}
                  </p>
                </div>

                {/* Local Micro Athletic statistics */}
                <div className="border-t border-zinc-800/60 pt-4 mt-4 grid grid-cols-2 gap-4">
                  {trainer.stats.map((stat, sIdx) => (
                    <div key={sIdx} className="text-left">
                      <span className="text-brand font-mono font-bold text-sm tracking-tight block">
                        {stat.value}
                      </span>
                      <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold block">
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Dynamic Coach contact bottom ribbon */}
        <div className="mt-16 text-center">
          <p className="text-xs text-zinc-500 uppercase tracking-widest font-semibold flex items-center justify-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-brand animate-spin" style={{ animationDuration: '3s' }} />
            Require fully bespoke coaching? Apply on our Contact Portal to schedule a fitness assessment.
          </p>
        </div>

      </div>
    </section>
  );
}
