import { motion } from "motion/react";
import { Sparkles, ArrowRight } from "lucide-react";
import { FloatingCard } from "./FloatingCard";
import { Link } from "react-router-dom";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-32 pb-16 overflow-hidden gradient-bg">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-brand-primary rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Gradient orbs */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-brand-primary/20 rounded-full blur-3xl animate-pulse" />
      <div
        className="absolute bottom-20 right-10 w-96 h-96 bg-brand-secondary/20 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
            >
              <Sparkles className="w-4 h-4 text-brand-primary" />
              <span className="text-sm text-brand-primary">
                Peer-to-Peer Learning Platform
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-6xl lg:text-7xl mb-6 bg-gradient-to-r from-white via-white/90 to-brand-primary bg-clip-text text-transparent"
              style={{ fontWeight: 800, lineHeight: 1.1 }}
            >
              Exchange Skills.
              <br />
              Earn Credits.
              <br />
              Learn Anything.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl text-neutral-400 mb-8 max-w-2xl mx-auto lg:mx-0"
            >
              Join SkillBarter - the revolutionary platform where students teach
              what they know, earn credits, and unlock unlimited learning
              opportunities through our credit-based barter system.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link to="/teach">
                <button className="group relative px-8 py-4 bg-brand-primary rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-brand-primary/20">
                  <span
                    className="relative z-10 flex items-center justify-center gap-2 text-background"
                    style={{ fontWeight: 600 }}
                  >
                    Start Teaching
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-brand-primary to-brand-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </Link>

              <Link to="/skills">
                <button
                  className="px-8 py-4 rounded-xl border border-neutral-800 text-white hover:bg-neutral-900/40 transition-all duration-300 hover:border-brand-primary/50"
                  style={{ fontWeight: 600 }}
                >
                  Explore Skills
                </button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-3 gap-6 mt-12 max-w-md mx-auto lg:mx-0"
            >
              {[
                { value: "10K+", label: "Students" },
                { value: "500+", label: "Skills" },
                { value: "50K+", label: "Sessions" },
              ].map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div
                    className="text-2xl md:text-3xl text-white mb-1"
                    style={{ fontWeight: 700 }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-sm text-neutral-400">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right floating cards */}
          <div className="relative hidden lg:block h-[600px]">
            <FloatingCard
              delay={0.2}
              className="absolute top-20 right-0"
              title="Profile"
              content={
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-primary to-brand-secondary" />
                  <div>
                    <div
                      className="text-white mb-1"
                      style={{ fontWeight: 600 }}
                    >
                      Sarah Chen
                    </div>
                    <div className="text-xs text-neutral-400">
                      Web Development Expert
                    </div>
                  </div>
                </div>
              }
            />

            <FloatingCard
              delay={0.4}
              className="absolute top-52 left-0"
              title="Skill Listing"
              content={
                <div>
                  <div className="text-white mb-2" style={{ fontWeight: 600 }}>
                    React & TypeScript
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="px-2 py-1 rounded-md bg-green-500/20 text-green-400 text-xs">
                      Available
                    </span>
                    <span className="text-neutral-400">60 credits/hour</span>
                  </div>
                </div>
              }
            />

            <FloatingCard
              delay={0.6}
              className="absolute bottom-32 right-10"
              title="Credit Balance"
              content={
                <div>
                  <div
                    className="text-3xl text-transparent bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text mb-1"
                    style={{ fontWeight: 700 }}
                  >
                    <CountUp end={1250} />
                  </div>
                  <div className="text-sm text-neutral-400">
                    Available Credits
                  </div>
                </div>
              }
            />

            <FloatingCard
              delay={0.8}
              className="absolute bottom-0 left-10"
              title="Next Session"
              content={
                <div>
                  <div className="text-white mb-1" style={{ fontWeight: 600 }}>
                    Python Basics
                  </div>
                  <div className="text-sm text-neutral-400">
                    Tomorrow at 3:00 PM
                  </div>
                  <div className="mt-2 text-xs text-brand-primary">
                    Google Meet
                  </div>
                </div>
              }
            />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-neutral-900/400 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}

function CountUp({ end }: { end: number }) {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = end / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [end]);

  return <>{count}</>;
}

import React from "react";
