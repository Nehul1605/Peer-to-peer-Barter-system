import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { Mail, Lock, User, ArrowRight } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useAuth } from "../context/AuthContext";

export default function SignupPage() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signup({ name, email, password });
      navigate("/login");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background patterns matching landing page */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-primary/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] animate-pulse delay-1000" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        <Link to="/" className="block mb-8 text-center group">
          <motion.h1
            whileHover={{ scale: 1.05 }}
            className="text-4xl font-black bg-gradient-to-r from-brand-primary to-blue-400 bg-clip-text text-transparent tracking-tighter italic"
          >
            SkillBarter
          </motion.h1>
        </Link>

        <div className="glass-strong rounded-[40px] p-10 border border-white/5 bg-neutral-900/40 shadow-2xl relative overflow-hidden">
          {/* Decorative Spotlight */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-brand-primary/10 rounded-full blur-3xl transition-all" />

          <h2 className="text-3xl font-black mb-2 tracking-tight">
            Create Account
          </h2>
          <p className="text-neutral-400 mb-8 font-medium italic">
            Join the community of skill swappers
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label
                htmlFor="name"
                className="text-xs font-black uppercase tracking-[0.2em] text-neutral-500 ml-1"
              >
                Your Name
              </Label>
              <div className="relative group/input">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 group-focus-within/input:text-brand-primary transition-colors" />
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-12 h-14 bg-neutral-950/50 border-white/5 text-white placeholder:text-neutral-600 rounded-2xl focus:border-brand-primary/50 focus:ring-brand-primary/20 transition-all font-medium"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-xs font-black uppercase tracking-[0.2em] text-neutral-500 ml-1"
              >
                Email Address
              </Label>
              <div className="relative group/input">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 group-focus-within/input:text-brand-primary transition-colors" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-12 h-14 bg-neutral-950/50 border-white/5 text-white placeholder:text-neutral-600 rounded-2xl focus:border-brand-primary/50 focus:ring-brand-primary/20 transition-all font-medium"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-xs font-black uppercase tracking-[0.2em] text-neutral-500 ml-1"
              >
                Secure Password
              </Label>
              <div className="relative group/input">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 group-focus-within/input:text-brand-primary transition-colors" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-12 h-14 bg-neutral-950/50 border-white/5 text-white placeholder:text-neutral-600 rounded-2xl focus:border-brand-primary/50 focus:ring-brand-primary/20 transition-all font-medium"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-14 bg-brand-primary hover:bg-brand-primary/90 text-neutral-950 font-black uppercase tracking-widest rounded-2xl transition-all duration-300 shadow-xl shadow-brand-primary/20 group mt-4 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-neutral-950/30 border-t-neutral-950 rounded-full animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  Create Account
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </form>

          <p className="mt-8 text-center text-neutral-500 font-medium text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-brand-primary hover:text-brand-primary/80 font-black transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
