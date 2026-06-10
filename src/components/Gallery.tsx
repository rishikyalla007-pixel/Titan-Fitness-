import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Camera, Eye, Zap } from "lucide-react";
import { GalleryItem } from "../types";

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "g1",
    url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop",
    category: "Strength",
    title: "Heavy Barbell Loading"
  },
  {
    id: "g2",
    url: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
    category: "Strength",
    title: "Dumbbell Compound Rack"
  },
  {
    id: "g3",
    url: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=800&auto=format&fit=crop",
    category: "Cardio",
    title: "Metabolic Spin Core"
  },
  {
    id: "g4",
    url: "https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=800&auto=format&fit=crop",
    category: "Combat",
    title: "Heavy Boxing Bag drills"
  },
  {
    id: "g5",
    url: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop",
    category: "Mindfulness",
    title: "Breath Flow Yoga Asana"
  },
  {
    id: "g6",
    url: "https://images.unsplash.com/photo-1605296867304-46d5465a25f1?q=80&w=800&auto=format&fit=crop",
    category: "Recovery",
    title: "Oxygen Compression Suite"
  }
];

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [zoomedImage, setZoomedImage] = useState<GalleryItem | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

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

  const filters = ["All", "Strength", "Cardio", "Combat", "Recovery", "Mindfulness"];

  const filteredItems = activeFilter === "All"
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === activeFilter);

  const sectionTop = sectionRef.current ? sectionRef.current.offsetTop : 3000;
  const parallaxOffset = (scrollY - sectionTop) * 0.12;

  return (
    <section ref={sectionRef} id="gallery" className="py-24 bg-[#050505] relative overflow-hidden">
      {/* Parallax Background Image */}
      <div className="absolute inset-0 z-0 overflow-hidden opacity-[0.06] pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=2000&auto=format&fit=crop"
          alt="Parallax background texture"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover scale-120 will-change-transform"
          style={{ transform: `translate3d(0, ${parallaxOffset}px, 0)` }}
        />
        <div className="absolute inset-0 bg-[#050505] opacity-30" />
      </div>

      <div className="absolute top-[20%] left-[-10%] w-[350px] h-[350px] rounded-full bg-brand/5 blur-[130px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-6">
          <div className="text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800/80 mb-4">
              <Camera className="w-3.5 h-3.5 text-brand" />
              <span className="text-[10px] font-bold tracking-[0.2em] text-brand uppercase">
                Compound Media
              </span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-white uppercase tracking-tight">
              Elite <span className="text-brand text-brand-gradient">Vessel.</span> <br />Inside Titan.
            </h2>
          </div>

          {/* Interactive Filters Scroll menu */}
          <div className="flex flex-wrap gap-2 max-w-full overflow-x-auto pb-2 scrollbar-none">
            {filters.map((filter) => {
              const isActive = activeFilter === filter;
              return (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4.5 py-2 text-xs font-black uppercase tracking-wider rounded-xl border transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "btn-gradient border-transparent text-black shadow-[0_0_15px_rgba(242,125,38,0.25)]"
                      : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700"
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>
        </div>

        {/* Masonry-Style Grid of images */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => {
              // Custom span heights to mimic modular masonry layout
              const sizeClass = index % 3 === 1 ? "h-[380px]" : "h-[300px]";
              
              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ y: -5 }}
                  onClick={() => setZoomedImage(item)}
                  className={`relative ${sizeClass} rounded-3xl overflow-hidden group border border-zinc-900 shadow-xl cursor-pointer bg-zinc-950`}
                >
                  {/* Photo Node */}
                  <img
                    src={item.url}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Glass Card Tint layer overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-60 group-hover:opacity-85 transition-opacity duration-300" />

                  {/* Absolute details on hover */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform duration-300 text-left">
                    <div className="flex items-center gap-2 mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                      <Zap className="w-3.5 h-3.5 text-brand" />
                      <span className="text-[10px] font-bold text-brand uppercase tracking-widest">
                        {item.category}
                      </span>
                    </div>

                    <h3 className="font-display font-medium text-lg text-white uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                      {item.title}
                    </h3>
                    
                    <span className="text-[10px] text-zinc-500 font-mono tracking-widest mt-2 uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-150 flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5" /> CLICK ENLARGE
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Zoom Lightbox Portal */}
        <AnimatePresence>
          {zoomedImage && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setZoomedImage(null)}
                className="absolute inset-0 bg-zinc-950/90 backdrop-blur-md"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative max-w-4xl max-h-[85vh] overflow-hidden rounded-3xl bg-zinc-900 border border-zinc-800 p-2 z-10 shadow-2xl flex flex-col"
              >
                <img
                  src={zoomedImage.url}
                  alt={zoomedImage.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full max-h-[75vh] object-contain rounded-2xl"
                />
                
                <div className="p-4 flex justify-between items-center bg-zinc-900">
                  <div className="text-left">
                    <span className="text-[10px] font-bold text-brand uppercase tracking-widest block">{zoomedImage.category}</span>
                    <strong className="font-display text-white text-base uppercase tracking-wider">{zoomedImage.title}</strong>
                  </div>
                  <button
                    onClick={() => setZoomedImage(null)}
                    className="px-4 py-2 bg-zinc-950 border border-zinc-800 text-zinc-400 hover:text-white transition rounded-xl text-xs uppercase font-bold tracking-widest cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
