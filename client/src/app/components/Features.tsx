import { motion } from "motion/react";
import { useInView } from "./useInView";
import {
  Video,
  Calendar,
  Shield,
  Zap,
  MessageSquare,
  Trophy,
} from "lucide-react";

const features = [
  {
    icon: Video,
    title: "Video Integration",
    description:
      "Seamless Google Meet & Microsoft Teams integration for live sessions",
    gradient: "from-brand-primary to-brand-primary/20",
    glow: "group-hover:shadow-brand-primary/20",
  },
  {
    icon: Calendar,
    title: "Smart Scheduling",
    description:
      "AI-powered calendar matching to find the perfect time for both parties",
    gradient: "from-brand-secondary to-brand-secondary/20",
    glow: "group-hover:shadow-brand-secondary/20",
  },
  {
    icon: Shield,
    title: "Verified Profiles",
    description: "Student verification and rating system for trusted learning",
    gradient: "from-brand-primary to-brand-secondary",
    glow: "group-hover:shadow-brand-primary/20",
  },
  {
    icon: Zap,
    title: "Instant Matching",
    description:
      "Find the right teacher or student in seconds with smart filters",
    gradient: "from-brand-secondary to-brand-primary",
    glow: "group-hover:shadow-brand-secondary/20",
  },
  {
    icon: MessageSquare,
    title: "Built-in Chat",
    description: "Communicate before, during, and after sessions with ease",
    gradient: "from-brand-primary to-neutral-500",
    glow: "group-hover:shadow-brand-primary/20",
  },
  {
    icon: Trophy,
    title: "Achievements",
    description: "Earn badges and track your learning & teaching milestones",
    gradient: "from-brand-secondary to-neutral-500",
    glow: "group-hover:shadow-brand-secondary/20",
  },
];

export function Features() {
  const { ref, inView } = useInView();

  return (
    <section
      id="features"
      ref={ref}
      className="py-24 bg-neutral-950 relative overflow-hidden"
    >
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-1.5 mb-4 rounded-full border border-brand-primary/20 bg-brand-primary/5">
            <span className="text-brand-primary text-sm font-semibold tracking-wider uppercase">
              Capabilities
            </span>
          </div>
          <h2
            className="text-4xl md:text-5xl mb-4 text-white"
            style={{ fontWeight: 700 }}
          >
            Platform Features
          </h2>
          <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
            Everything you need for seamless skill exchange
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * idx }}
              className={`glass-strong rounded-2xl p-6 border border-white/5 hover:border-brand-primary/20 bg-neutral-900/40 transition-all duration-300 group cursor-pointer hover:-translate-y-2 hover:shadow-2xl ${feature.glow}`}
            >
              <div
                className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-black/20`}
              >
                <feature.icon className="w-7 h-7 text-white" />
              </div>

              <h3
                className="text-xl text-white mb-2"
                style={{ fontWeight: 600 }}
              >
                {feature.title}
              </h3>

              <p className="text-neutral-400 text-sm leading-relaxed">
                {feature.description}
              </p>

              {/* Hover indicator */}
              <div
                className={`h-1 bg-gradient-to-r ${feature.gradient} rounded-full mt-4 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
