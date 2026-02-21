import { motion } from "motion/react";
import { ReactNode } from "react";

interface FloatingCardProps {
  delay: number;
  className: string;
  title: string;
  content: ReactNode;
}

export function FloatingCard({ delay, className, title, content }: FloatingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
      className={className}
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, delay }}
        className="glass-strong rounded-2xl p-4 shadow-2xl hover:shadow-brand-primary/20 transition-all duration-300 hover:scale-105 w-64"
      >
        <div className="text-xs text-neutral-400 mb-2" style={{ fontWeight: 500 }}>{title}</div>
        {content}
      </motion.div>
    </motion.div>
  );
}
