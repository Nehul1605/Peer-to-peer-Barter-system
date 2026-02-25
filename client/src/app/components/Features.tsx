import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useInView } from "./useInView";
import {
  Video,
  Calendar,
  Shield,
  Zap,
  MessageSquare,
  Trophy,
  Sparkles,
  X,
  CheckCircle2,
} from "lucide-react";

const features = [
  {
    icon: Video,
    title: "Video Integration",
    shortDesc: "Seamless Google Meet & Microsoft Teams integration for live peer-to-peer sessions.",
    longDesc: "Host your skill exchange sessions directly through our platform. We integrate with major video providers to ensure high-quality, stable connections for every barter.",
    bullets: ["One-click meeting creation", "In-session screen sharing", "Automated session recording"],
    color: "text-blue-400",
    glow: "rgba(96, 165, 250, 0.25)",
  },
  {
    icon: Calendar,
    title: "Smart Scheduling",
    shortDesc: "AI-powered calendar matching to find the perfect time for both parties automatically.",
    longDesc: "Never play email tag again. Our smart scheduler looks at availability from both parties and suggests the optimal time slots that work for everyone.",
    bullets: ["Timezone synchronization", "Google Calendar sync", "Automated reminders"],
    color: "text-emerald-400",
    glow: "rgba(52, 211, 153, 0.25)",
  },
  {
    icon: Shield,
    title: "Verified Profiles",
    shortDesc: "Multi-step verification and student rating system to ensure a trusted learning environment.",
    longDesc: "We take community trust seriously. Every member undergoes a verification process, and our peer-review system ensures accountability and excellence.",
    bullets: ["Identity verification", "Verified skill badges", "Detailed peer reviews"],
    color: "text-purple-400",
    glow: "rgba(192, 132, 252, 0.25)",
  },
  {
    icon: Zap,
    title: "Instant Matching",
    shortDesc: "Find the right teacher or student in seconds with smart filters and availability logic.",
    longDesc: "Our proprietary algorithm analyzes thousands of skill combinations to find you the most compatible learning partner instantly.",
    bullets: ["Skill-based discovery", "Proximity matching", "Subject interest overlap"],
    color: "text-yellow-400",
    glow: "rgba(250, 204, 21, 0.25)",
  },
  {
    icon: MessageSquare,
    title: "Built-in Chat",
    shortDesc: "Communicate securely before, during, and after sessions with our real-time messaging.",
    longDesc: "Discuss goals and share resources through our integrated messaging system. Keep all your learning conversations organized in one place.",
    bullets: ["Real-time messaging", "File & resource sharing", "Session history"],
    color: "text-rose-400",
    glow: "rgba(251, 113, 133, 0.25)",
  },
  {
    icon: Trophy,
    title: "Skill Credentials",
    shortDesc: "Earn verified badges and certificates that showcase your expertise to the community.",
    longDesc: "Build your reputation as you learn and teach. Collect digital credentials that you can showcase on your profile and professional networks.",
    bullets: ["Community leaderboard", "Sharable certificates", "Skill mastery levels"],
    color: "text-cyan-400",
    glow: "rgba(34, 211, 238, 0.25)",
  },
];

function FeatureCard({ feature, index, inView, onOpen }: { feature: typeof features[0], index: number, inView: boolean, onOpen: () => void }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={onOpen}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1 * index }}
      whileHover={{ y: -10, scale: 1.02 }}
      className="relative group cursor-pointer"
    >
      <div className="glass-strong rounded-2xl p-8 h-full border border-white/5 bg-neutral-900/40 relative overflow-hidden transition-all duration-500 group-hover:border-white/20 group-hover:bg-neutral-900/60 shadow-2xl">
        {/* Spotlight Effect */}
        <div
          className="pointer-events-none absolute -inset-px transition-opacity duration-300"
          style={{
            opacity: isHovering ? 1 : 0,
            background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, ${feature.glow}, transparent 40%)`,
          }}
        />

        <div className="relative z-10">
          <motion.div
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ 
              rotate: { duration: 1.5, ease: "easeInOut" },
              scale: { type: "spring", stiffness: 300, damping: 20 }
            }}
            className={`w-14 h-14 rounded-2xl bg-white/5 ${feature.color} flex items-center justify-center mb-6 group-hover:bg-white/10 transition-all duration-300 shadow-lg shadow-black/20`}
          >
            <feature.icon className="w-7 h-7" />
          </motion.div>

          <h3 className="text-2xl text-white font-bold mb-3 group-hover:text-brand-primary transition-colors">
            {feature.title}
          </h3>

          <p className="text-neutral-400 text-base leading-relaxed font-medium">
            {feature.shortDesc}
          </p>

          <div className="mt-8 flex items-center gap-2 group/btn">
            <span className="text-xs font-black uppercase tracking-widest text-brand-primary group-hover:text-white transition-colors">Learn More</span>
            <div className={`h-px flex-grow bg-gradient-to-r from-brand-primary/40 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Features() {
  const { ref, inView } = useInView();
  const [selectedFeature, setSelectedFeature] = useState<typeof features[0] | null>(null);

  return (
    <section
      id="features"
      ref={ref}
      className="py-32 bg-neutral-950 relative overflow-hidden"
    >
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full border border-brand-primary/20 bg-brand-primary/5">
            <Sparkles className="w-4 h-4 text-brand-primary" />
            <span className="text-brand-primary text-xs font-black tracking-widest uppercase">
              Capabilities
            </span>
          </div>
          <h2 className="text-5xl md:text-7xl mb-6 text-white tracking-tighter font-black">
            Platform <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-blue-400">Features.</span>
          </h2>
          <p className="text-xl text-neutral-400 max-w-2xl mx-auto font-medium leading-relaxed">
            Everything you need for a seamless, secure, and professional skill exchange experience.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {features.map((feature, idx) => (
            <FeatureCard 
              key={idx} 
              feature={feature} 
              index={idx} 
              inView={inView} 
              onOpen={() => setSelectedFeature(feature)}
            />
          ))}
        </div>
      </div>

      {/* Feature Details Modal */}
      <AnimatePresence>
        {selectedFeature && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedFeature(null)}
              className="absolute inset-0 bg-neutral-950/80 backdrop-blur-md"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl glass-strong rounded-[32px] border border-white/10 p-8 md:p-12 overflow-hidden bg-neutral-900 shadow-2xl"
            >
              {/* Background Glow */}
              <div 
                className="absolute -top-24 -right-24 w-64 h-64 blur-[100px] rounded-full opacity-20 pointer-events-none"
                style={{ backgroundColor: selectedFeature.glow }}
              />

              <button 
                onClick={() => setSelectedFeature(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
                <div className={`w-20 h-20 shrink-0 rounded-[24px] bg-white/5 ${selectedFeature.color} flex items-center justify-center shadow-xl`}>
                  <selectedFeature.icon className="w-10 h-10" />
                </div>

                <div className="flex-grow">
                  <h3 className="text-3xl md:text-4xl text-white font-black tracking-tight mb-4">
                    {selectedFeature.title}
                  </h3>
                  <p className="text-neutral-400 text-lg leading-relaxed mb-8">
                    {selectedFeature.longDesc}
                  </p>

                  <div className="space-y-4">
                    <h4 className="text-white text-sm font-black uppercase tracking-widest flex items-center gap-2">
                       Key Benefits
                    </h4>
                    <div className="grid sm:grid-cols-1 gap-3">
                      {selectedFeature.bullets.map((bullet, i) => (
                        <div key={i} className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/5">
                          <CheckCircle2 className={`w-5 h-5 ${selectedFeature.color}`} />
                          <span className="text-neutral-200 font-medium">{bullet}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button 
                    onClick={() => setSelectedFeature(null)}
                    className="mt-12 w-full py-4 rounded-2xl bg-brand-primary text-neutral-950 font-black uppercase tracking-widest hover:bg-white transition-colors"
                  >
                    Got it
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
