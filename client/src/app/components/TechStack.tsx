import { useState, useRef } from "react";
import { motion } from "motion/react";
import { useInView } from "./useInView";
import { Sparkles, Cpu, Zap } from "lucide-react";

const ReactIcon = (props: any) => (
  <svg
    viewBox="-11.5 -10.23174 23 20.46348"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx="0" cy="0" r="2.05" fill="currentColor" />
    <g stroke="currentColor" strokeWidth="1">
      <ellipse rx="11" ry="4.2" />
      <ellipse rx="11" ry="4.2" transform="rotate(60)" />
      <ellipse rx="11" ry="4.2" transform="rotate(120)" />
    </g>
  </svg>
);

const ViteIcon = (props: any) => (
  <svg
    viewBox="0 0 256 256"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid"
    {...props}
  >
    <defs>
      <linearGradient x1="0%" y1="0%" x2="100%" y2="0%" id="vite-a">
        <stop stopColor="#41D1FF" offset="0%" />
        <stop stopColor="#BD34FE" offset="100%" />
      </linearGradient>
    </defs>
    <path
      d="M255.153 37.935L129.231 254.231 3.308 37.935h251.845z"
      fill="url(#vite-a)"
    />
    <path
      d="M209.933 37.935L129.231 197.644 48.529 37.935h161.404z"
      fill="#BD34FE"
    />
    <path
      d="M141.538 10.615l-12.307-10.615-12.308 10.615h24.615z"
      fill="#FFC517"
    />
  </svg>
);

const TailwindIcon = (props: any) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
  </svg>
);

const FramerIcon = (props: any) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M4 0h16v8l-8 8V8H4V0zm8 8h8v8l-8 8V16H4V8h8z" />
  </svg>
);

const RadixIcon = (props: any) => (
  <svg
    viewBox="0 0 25 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M23.25 12C23.25 18.2132 18.2132 23.25 12 23.25C5.7868 23.25 0.75 18.2132 0.75 12C0.75 5.7868 5.7868 0.75 12 0.75C18.2132 0.75 23.25 5.7868 23.25 12Z"
      fill="currentColor"
    />
  </svg>
);

const RouterIcon = (props: any) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const PostgreIcon = (props: any) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M12.5 2c-3.4 0-6.1 2.2-7.5 5.5-.3-.1-.7-.1-1-.1C1.8 7.4.4 8.8.4 10.6c0 1.5 1 2.8 2.3 3.1-.1.4-.2.8-.2 1.2 0 3.9 3.1 7.1 7 7.1h6c4.4 0 8-3.6 8-8s-3.6-8-8-8c-.3 0-.7 0-1 .1C13.2 3.6 13 2 12.5 2z" />
  </svg>
);

const RechartsIcon = (props: any) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M3 13h2v7H3v-7zm4-5h2v12H7V8zm4 7h2v5h-2v-5zm4-10h2v15h-2V5zm4 8h2v7h-2v-7z" />
  </svg>
);

const technologies = [
  {
    name: "React (v18)",
    description: "Modern UI Library",
    icon: ReactIcon,
    color: "text-blue-400",
    glow: "rgba(96, 165, 250, 0.25)",
  },
  {
    name: "Vite",
    description: "Lightning Fast Build",
    icon: ViteIcon,
    color: "text-yellow-400",
    glow: "rgba(250, 204, 21, 0.25)",
  },
  {
    name: "Tailwind CSS v4",
    description: "Next-gen Styling",
    icon: TailwindIcon,
    color: "text-cyan-400",
    glow: "rgba(34, 211, 238, 0.25)",
  },
  {
    name: "Framer Motion",
    description: "Fluid Animations",
    icon: FramerIcon,
    color: "text-pink-400",
    glow: "rgba(244, 114, 182, 0.25)",
  },
  {
    name: "Radix UI",
    description: "Headless Primitives",
    icon: RadixIcon,
    color: "text-indigo-400",
    glow: "rgba(129, 140, 248, 0.25)",
  },
  {
    name: "React Router",
    description: "Dynamic Navigation",
    icon: RouterIcon,
    color: "text-red-400",
    glow: "rgba(248, 113, 113, 0.25)",
  },
  {
    name: "PostgreSQL",
    description: "Relational Database",
    icon: PostgreIcon,
    color: "text-blue-500",
    glow: "rgba(59, 130, 246, 0.25)",
  },
  {
    name: "Recharts",
    description: "Data Visualization",
    icon: RechartsIcon,
    color: "text-emerald-400",
    glow: "rgba(52, 211, 153, 0.25)",
  },
];

function TechCard({
  tech,
  index,
  inView,
}: {
  tech: (typeof technologies)[0];
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
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="relative group cursor-default"
    >
      <div className="glass-strong rounded-2xl p-6 h-full border border-white/5 bg-neutral-900/40 relative overflow-hidden transition-all duration-500 group-hover:border-white/20 group-hover:bg-neutral-900/60 shadow-2xl">
        {/* Spotlight Effect */}
        <div
          className="pointer-events-none absolute -inset-px transition-opacity duration-300"
          style={{
            opacity: isHovering ? 1 : 0,
            background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, ${tech.glow}, transparent 40%)`,
          }}
        />

        <div className="relative z-10 flex flex-col items-center text-center">
          <motion.div
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{
              rotate: { duration: 1, ease: "easeInOut" },
              scale: { type: "spring", stiffness: 300, damping: 20 },
            }}
            className={`mb-4 p-4 rounded-2xl bg-white/5 ${tech.color} group-hover:bg-white/10 transition-all duration-300`}
          >
            <tech.icon className="w-8 h-8 md:w-10 md:h-10" />
          </motion.div>

          <h3 className="text-white font-bold text-lg mb-1 group-hover:text-brand-primary transition-colors">
            {tech.name}
          </h3>
          <p className="text-neutral-500 text-xs font-medium uppercase tracking-wider">
            {tech.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export function TechStack() {
  const { ref, inView } = useInView();

  return (
    <section
      ref={ref}
      className="py-32 bg-neutral-950 relative overflow-hidden"
    >
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-primary/10 rounded-full blur-[120px] animate-pulse" />
        <div
          className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px] animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full border border-brand-primary/20 bg-brand-primary/5">
            <Cpu className="w-4 h-4 text-brand-primary" />
            <span className="text-brand-primary text-xs font-black tracking-widest uppercase">
              The Engine Room
            </span>
          </div>
          <h2 className="text-5xl md:text-7xl mb-6 text-white tracking-tighter font-black">
            Modern{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-blue-400">
              Architecture.
            </span>
          </h2>
          <p className="text-xl text-neutral-400 max-w-2xl mx-auto font-medium leading-relaxed">
            Built with a high-performance stack designed for scale, speed, and a
            seamless developer experience.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {technologies.map((tech, idx) => (
            <TechCard key={idx} tech={tech} index={idx} inView={inView} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-24 flex justify-center"
        >
          <div className="group relative">
            {/* Pulsing Outer Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-brand-primary to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />

            <div className="relative px-8 py-4 glass-strong rounded-2xl border border-white/10 flex items-center gap-6 divide-x divide-white/10">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-3">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full border-2 border-neutral-950 bg-neutral-900 flex items-center justify-center shadow-lg transform group-hover:-translate-y-1 transition-transform"
                      style={{ transitionDelay: `${i * 100}ms` }}
                    >
                      <Zap
                        className={`w-4 h-4 ${i === 1 ? "text-brand-primary" : i === 2 ? "text-blue-400" : "text-cyan-400"}`}
                      />
                    </div>
                  ))}
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-neutral-500 font-black uppercase tracking-widest">
                    Performance
                  </span>
                  <span className="text-white font-bold text-sm tracking-tight">
                    10ms Latency
                  </span>
                </div>
              </div>

              <div className="pl-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center border border-brand-primary/20">
                  <Sparkles className="w-5 h-5 text-brand-primary" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-neutral-500 font-black uppercase tracking-widest">
                    Reliability
                  </span>
                  <span className="text-white font-bold text-sm tracking-tight">
                    99.9% Uptime
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
