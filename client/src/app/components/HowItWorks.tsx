import { motion } from "motion/react";
import { useState, useRef } from "react";
import { useInView } from "./useInView";
import {
  User,
  Users,
  Video,
  Zap,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const steps = [
  {
    icon: User,
    title: "Create Profile",
    description:
      "Showcase your expertise and discover skills you've always wanted to master. Our smart engine handles the rest.",
    color: "text-blue-400",
    glow: "rgba(96, 165, 250, 0.2)",
    bg: "from-blue-600/20 to-transparent",
  },
  {
    icon: Users,
    title: "Instant Match",
    description:
      "Connect instantly with peers who match your teaching and learning profile. No searching, just matching.",
    color: "text-emerald-400",
    glow: "rgba(52, 211, 153, 0.2)",
    bg: "from-emerald-600/20 to-transparent",
  },
  {
    icon: Video,
    title: "Earn Credits",
    description:
      "Launch live sessions via built-in integration. Earn credits for every minute you teach and invest them in your growth.",
    color: "text-purple-400",
    glow: "rgba(192, 132, 252, 0.2)",
    bg: "from-purple-600/20 to-transparent",
  },
];

function StepCard({
  step,
  index,
  inView,
}: {
  step: (typeof steps)[0];
  index: number;
  inView: boolean;
}) {
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
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.2 * index }}
      whileHover={{ y: -10 }}
      className="relative group h-full"
    >
      <div className="glass-strong rounded-[32px] p-10 h-full border border-white/5 bg-neutral-900/40 relative overflow-hidden transition-all duration-500 group-hover:border-white/20 group-hover:bg-neutral-900/60 shadow-2xl">
        {/* Spotlight Effect */}
        <div
          className="pointer-events-none absolute -inset-px transition-opacity duration-300"
          style={{
            opacity: isHovering ? 1 : 0,
            background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, ${step.glow}, transparent 40%)`,
          }}
        />

        {/* Step Number Badge */}
        <div className="absolute top-8 right-10 flex items-center gap-2">
          <span className="text-4xl font-black text-white/5 group-hover:text-white/10 transition-colors uppercase italic tracking-tighter">
            0{index + 1}
          </span>
        </div>

        <div className="relative z-10 flex flex-col h-full">
          <motion.div
            whileHover={{ rotate: 10, scale: 1.1 }}
            className={`w-20 h-20 rounded-3xl bg-neutral-950 border border-white/10 ${step.color} flex items-center justify-center mb-8 shadow-xl`}
          >
            <step.icon className="w-10 h-10" />
          </motion.div>

          <h3 className="text-3xl font-black text-white mb-4 tracking-tight group-hover:text-brand-primary transition-colors">
            {step.title}
          </h3>

          <p className="text-neutral-400 text-lg leading-relaxed font-medium mb-8">
            {step.description}
          </p>

          <div className="mt-auto flex items-center gap-2">
            <CheckCircle2 className={`w-5 h-5 ${step.color}`} />
            <span className="text-xs font-black uppercase tracking-widest text-neutral-500 group-hover:text-neutral-300 transition-colors">
              Verified Step
            </span>
          </div>
        </div>
      </div>

      {/* Connecting Arrow for Desktop */}
      {index < 2 && (
        <div className="hidden lg:flex absolute top-1/2 -right-4 translate-x-1/2 -translate-y-1/2 z-20">
          <motion.div
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-12 h-12 rounded-full bg-neutral-950 border border-white/10 flex items-center justify-center shadow-2xl"
          >
            <ArrowRight className="w-6 h-6 text-brand-primary" />
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}

export function HowItWorks() {
  const { ref, inView } = useInView();

  return (
    <section
      id="how-it-works"
      ref={ref}
      className="py-32 bg-neutral-950 relative overflow-hidden"
    >
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full border border-brand-primary/20 bg-brand-primary/5">
            <Zap className="w-4 h-4 text-brand-primary" />
            <span className="text-brand-primary text-xs font-black tracking-widest uppercase">
              The Protocol
            </span>
          </div>
          <h2 className="text-5xl md:text-7xl mb-6 text-white tracking-tighter font-black">
            Simple.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-blue-400">
              Effective.
            </span>
          </h2>
          <p className="text-xl text-neutral-400 max-w-2xl mx-auto font-medium leading-relaxed">
            A frictionless journey from finding a mentor to mastering a new
            craft through community-driven exchange.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {steps.map((step, idx) => (
            <StepCard key={idx} step={step} index={idx} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
