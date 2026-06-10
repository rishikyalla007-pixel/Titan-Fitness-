import { MapPin, Compass, Clock, Phone } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-[#050505] relative overflow-hidden">
      {/* Background design accents */}
      <div className="absolute top-[20%] left-[-10%] w-[380px] h-[380px] rounded-full bg-brand/5 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[330px] h-[330px] rounded-full bg-orange-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Section Header */}
        <div className="text-center max-w-2.5xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 mb-4">
            <Compass className="w-3.5 h-3.5 text-brand" />
            <span className="text-[10px] font-bold tracking-[0.2em] text-brand/90 uppercase">
              Location & Support
            </span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-white uppercase tracking-tight">
            Connect With the <span className="text-brand text-brand-gradient">Command.</span>
          </h2>
          <p className="text-zinc-400 text-sm mt-3.5 font-light leading-relaxed">
            Ready to experience peak human conditioning? Arrange your personalized physical workspace induction tour or reach our desk 24/7.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-4">
          
          {/* Contact Details & CSS Spot locator Block */}
          <div className="lg:col-span-12 xl:col-span-5 flex flex-col justify-between space-y-8">
            
            {/* High level details rows */}
            <div className="space-y-6">
              {[
                {
                  icon: <MapPin className="w-5 h-5 text-brand" />,
                  title: "Headquarters Location",
                  value: "Titan Towers, Block H-14, Inner Circle, Connaught Place, New Delhi - 110001",
                },
                {
                  icon: <Phone className="w-5 h-5 text-brand" />,
                  title: "Admissions & Hotline Desk",
                  value: "+91 9502858048",
                },
                {
                  icon: <Clock className="w-5 h-5 text-brand" />,
                  title: "Active Lobby Hours",
                  value: "Mon - Sat: 5:00 AM - 10:00 PM | Sun: 6:00 AM - 8:00 PM",
                }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4 p-4 glass-panel rounded-2xl border border-zinc-850">
                  <div className="p-3 bg-zinc-950 border border-zinc-850 rounded-xl shrink-0 text-brand flex items-center justify-center">
                    {item.icon}
                  </div>
                  <div className="text-left">
                    <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest leading-relaxed">
                      {item.title}
                    </h4>
                    <p className="text-zinc-200 text-sm font-sans mt-0.5 leading-relaxed font-light">
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Google Maps Embed Placeholder */}
            <div className="relative h-64 rounded-3xl overflow-hidden border border-zinc-800 bg-zinc-950 shadow-lg group">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.2619097725964!2d77.21855627622922!3d28.62142278456108!2m3!1f0!2f0!3f0!3m2!1i1024!2i758!4f13.1!3m3!1m2!1s0x390cfd36a5cd58db%3A0xc6cb5a6208bbdfc6!2sConnaught%20Place%2C%20New%20Delhi%2C%20Delhi%20110001!5e0!3m2!1sen!2sin!4v1716900000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) grayscale(80%) contrast(110%)" }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 z-0 bg-zinc-950"
              />
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-4 left-4 bg-zinc-950/90 border border-zinc-850 px-3 py-1.5 rounded-xl text-left pointer-events-none z-10 shadow-lg">
                <strong className="text-[10px] text-white uppercase block tracking-wider font-display">Titan Connaught Place Club</strong>
                <span className="text-[8.5px] text-zinc-400 block font-light">Block H-14, Inner Circle CP, New Delhi</span>
              </div>
            </div>

          </div>

          {/* Contact dispatcher dialog panel replaced with Call Action */}
          <div className="lg:col-span-12 xl:col-span-7">
            <div className="glass-panel border-zinc-800/50 rounded-3xl p-8 lg:p-16 flex flex-col items-center justify-center text-center shadow-2xl relative h-full">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand/5 blur-3xl pointer-events-none rounded-full" />
              <div className="absolute inset-0 dot-grid opacity-[0.06] pointer-events-none" />
              
              <div className="relative z-10 w-full flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-brand/10 border border-brand/20 flex flex-col items-center justify-center mb-6 shadow-[0_0_30px_rgba(242,125,38,0.15)] animate-pulse">
                  <Phone className="w-8 h-8 text-brand" />
                </div>
                
                <h3 className="font-display font-black text-xs text-zinc-500 mb-2 uppercase tracking-widest leading-relaxed">
                  Call Us Directly
                </h3>
                <a 
                  href="tel:+919502858048"
                  className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white hover:text-brand transition-colors duration-300 tracking-tighter"
                >
                  +91 9502858048
                </a>

                <p className="text-zinc-400 text-sm mt-6 font-light max-w-sm">
                  We process all memberships and inquiries strictly via phone selection to ensure premium client handling.
                </p>

                <div className="mt-10 pt-8 border-t border-zinc-800/80 w-full max-w-md">
                  <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-4">
                    Active Lobby Hours
                  </h4>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 font-mono text-xs">
                    <div className="flex flex-col items-center text-zinc-300">
                      <span className="text-brand mb-1">MON - SAT</span>
                      5:00 AM - 10:00 PM
                    </div>
                    <div className="hidden sm:block w-px h-8 bg-zinc-800" />
                    <div className="flex flex-col items-center text-zinc-300">
                      <span className="text-brand mb-1">SUN</span>
                      6:00 AM - 8:00 PM
                    </div>
                  </div>
                </div>

                <a
                  href="tel:+919502858048"
                  className="mt-10 w-full sm:w-auto px-12 py-5 rounded-xl btn-gradient font-black uppercase text-sm tracking-widest text-black hover:scale-103 active:scale-97 transition duration-300 shadow-[0_0_25px_rgba(242,125,38,0.3)] flex items-center justify-center gap-2 cursor-pointer inline-flex"
                >
                  <Phone className="w-5 h-5 fill-black stroke-black shrink-0" />
                  <span>Call Now</span>
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
