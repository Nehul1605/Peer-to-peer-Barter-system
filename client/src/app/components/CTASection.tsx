import { motion } from "motion/react";
import { useInView } from "./useInView";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export function CTASection() {
  const { ref, inView } = useInView();

  return (
    <section
      ref={ref}
      className="py-32 bg-[var(--background)] relative overflow-hidden"
    >
      {/* Animated wave background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg
          className="absolute bottom-0 w-full h-96"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <motion.path
            initial={{
              d: "M0,160L48,144C96,128,192,96,288,106.7C384,117,480,171,576,181.3C672,192,768,160,864,128C960,96,1056,64,1152,69.3C1248,75,1344,117,1392,138.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
            }}
            animate={
              inView
                ? {
                    d: [
                      "M0,160L48,144C96,128,192,96,288,106.7C384,117,480,171,576,181.3C672,192,768,160,864,128C960,96,1056,64,1152,69.3C1248,75,1344,117,1392,138.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                      "M0,192L48,176C96,160,192,128,288,128C384,128,480,160,576,186.7C672,213,768,235,864,224C960,213,1056,171,1152,154.7C1248,139,1344,149,1392,154.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                      "M0,160L48,144C96,128,192,96,288,106.7C384,117,480,171,576,181.3C672,192,768,160,864,128C960,96,1056,64,1152,69.3C1248,75,1344,117,1392,138.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                    ],
                  }
                : {}
            }
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            fill="url(#wave-gradient)"
          />
          <defs>
            <linearGradient
              id="wave-gradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.05" />
              <stop offset="50%" stopColor="#2dd4bf" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#fb7185" stopOpacity="0.05" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Glowing orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-primary/10 rounded-full blur-[120px]" />
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-secondary/5 rounded-full blur-[100px]" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-primary/20 bg-brand-primary/5 mb-8"
          >
            <Sparkles className="w-4 h-4 text-brand-primary" />
            <span className="text-sm font-semibold text-brand-primary tracking-wide">
              Join 10,000+ Students Already Learning
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-7xl mb-6 bg-gradient-to-r from-white via-white/80 to-brand-primary bg-clip-text text-transparent"
            style={{ fontWeight: 800, lineHeight: 1.1 }}
          >
            Start Your
            <br />
            Skill Journey Today
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="text-xl text-neutral-400 mb-12 max-w-2xl mx-auto"
          >
            Sign up today and get 50 bonus credits to jumpstart your learning
            adventure. No credit card required.
          </motion.p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/signup">
              <button className="group relative px-10 py-5 bg-brand-primary rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-brand-primary/20">
                <span
                  className="relative z-10 flex items-center justify-center gap-2 text-background text-lg"
                  style={{ fontWeight: 700 }}
                >
                  Get Started Free
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-brand-primary to-brand-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </Link>

            <Link to="/login">
              <button
                className="px-10 py-5 rounded-xl border border-neutral-800 text-white hover:bg-neutral-900/40 transition-all duration-300 hover:border-brand-primary/50 text-lg"
                style={{ fontWeight: 600 }}
              >
                Sign In
              </button>
            </Link>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto border-t border-white/5 pt-16"
        >
          {[
            { value: "500K+", label: "Credits Exchanged" },
            { value: "98%", label: "Satisfaction Rate" },
            { value: "4.9/5", label: "Average Rating" },
          ].map((stat, idx) => (
            <div key={idx} className="text-center">
              <div
                className="text-3xl md:text-4xl bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent mb-2"
                style={{ fontWeight: 700 }}
              >
                {stat.value}
              </div>
              <div className="text-sm text-neutral-400 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
