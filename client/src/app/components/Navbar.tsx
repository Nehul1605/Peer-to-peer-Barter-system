import { motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-[100] glass-strong border-b border-white/5"
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent"
            style={{ fontWeight: 700 }}
          >
            SkillBarter
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#how-it-works"
              className="text-neutral-300 hover:text-brand-primary transition-colors text-sm font-medium"
            >
              How it Works
            </a>
            <a
              href="#features"
              className="text-neutral-300 hover:text-brand-primary transition-colors text-sm font-medium"
            >
              Features
            </a>
            <a
              href="#testimonials"
              className="text-neutral-300 hover:text-brand-primary transition-colors text-sm font-medium"
            >
              Testimonials
            </a>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/login"
              className="px-6 py-2 text-neutral-300 hover:text-white transition-colors text-sm font-semibold"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="px-5 py-2.5 bg-brand-primary rounded-lg text-neutral-950 hover:opacity-90 transition-all duration-300 shadow-lg shadow-brand-primary/20"
              style={{ fontWeight: 700 }}
            >
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-neutral-300 p-2"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden pb-6"
          >
            <div className="flex flex-col gap-4">
              <a
                href="#how-it-works"
                onClick={() => setIsOpen(false)}
                className="text-neutral-300 hover:text-white transition-colors py-2"
              >
                How it Works
              </a>
              <a
                href="#features"
                onClick={() => setIsOpen(false)}
                className="text-neutral-300 hover:text-white transition-colors py-2"
              >
                Features
              </a>
              <a
                href="#testimonials"
                onClick={() => setIsOpen(false)}
                className="text-neutral-300 hover:text-white transition-colors py-2"
              >
                Testimonials
              </a>
              <div className="border-t border-neutral-800 pt-4 mt-2">
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="block w-full px-6 py-2 text-center text-neutral-300 hover:text-white transition-colors mb-2"
                  style={{ fontWeight: 500 }}
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setIsOpen(false)}
                  className="block w-full px-6 py-3 bg-brand-primary rounded-lg text-neutral-950 text-center font-bold"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
