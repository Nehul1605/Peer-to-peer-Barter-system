import { motion } from "motion/react";
import { useInView } from "./useInView";
import { Code2, Database, Video, Lock, Zap, Globe } from "lucide-react";

const technologies = [
  { icon: Code2, name: "React", color: "#2dd4bf" },
  { icon: Database, name: "PostgreSQL", color: "#fb7185" },
  { icon: Video, name: "WebRTC", color: "#2dd4bf" },
  { icon: Lock, name: "OAuth 2.0", color: "#fb7185" },
  { icon: Zap, name: "Redis", color: "#2dd4bf" },
  { icon: Globe, name: "GraphQL", color: "#fb7185" },
  { icon: Code2, name: "TypeScript", color: "#2dd4bf" },
  { icon: Database, name: "MongoDB", color: "#fb7185" },
];

export function TechStack() {
  const { ref, inView } = useInView();

  return (
    <section
      ref={ref}
      className="py-24 bg-[var(--background)] relative overflow-hidden"
    >
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-brand-primary/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-brand-secondary/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2
            className="text-4xl md:text-5xl mb-4 text-white"
            style={{ fontWeight: 700 }}
          >
            Technology Stack
          </h2>
          <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
            Built with modern, scalable technologies
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {technologies.map((tech, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.05 * idx }}
              className="glass-strong rounded-xl p-6 hover:bg-neutral-900/60 transition-all duration-300 group cursor-pointer flex flex-col items-center justify-center aspect-square hover:scale-105"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="mb-4"
                style={{ color: tech.color }}
              >
                <tech.icon className="w-12 h-12" />
              </motion.div>

              <div
                className="text-white text-center"
                style={{ fontWeight: 600 }}
              >
                {tech.name}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 glass rounded-full">
            <div className="w-2 h-2 bg-brand-secondary rounded-full animate-pulse" />
            <span className="text-sm text-neutral-300">
              99.9% Uptime • Enterprise Grade Security
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
