import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';

interface LoginPageProps {
  onLogin: () => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login - in real app, this would validate credentials
    onLogin();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[var(--background)] text-white flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/20 via-brand-secondary/20 to-brand-primary/20 animate-gradient" />
      
      {/* Floating orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-brand-primary/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-brand-secondary/20 rounded-full blur-3xl animate-pulse delay-1000" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Logo/Brand */}
        <Link to="/" className="block mb-8 text-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
            SkillBarter
          </h1>
        </Link>

        {/* Login Form */}
        <div className="bg-neutral-900/40 backdrop-blur-xl border border-neutral-800 rounded-2xl p-8 shadow-2xl">
          <h2 className="text-2xl mb-2">Welcome Back</h2>
          <p className="text-neutral-400 mb-6">Login to continue your learning journey</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-neutral-300">Email</Label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-neutral-900/40 border-neutral-800 text-white placeholder:text-neutral-500"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="password" className="text-neutral-300">Password</Label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 bg-neutral-900/40 border-neutral-800 text-white placeholder:text-neutral-500"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-neutral-400 cursor-pointer">
                <input type="checkbox" className="rounded border-neutral-800 bg-neutral-900/40" />
                Remember me
              </label>
              <a href="#" className="text-brand-primary hover:text-brand-primary">
                Forgot password?
              </a>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-brand-primary to-brand-secondary hover:from-brand-primary hover:to-brand-secondary text-white group"
            >
              Sign In
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-neutral-400">
            Don't have an account?{' '}
            <Link to="/signup" className="text-brand-primary hover:text-brand-primary">
              Sign up
            </Link>
          </div>
        </div>

        {/* Quick Demo Login */}
        <div className="mt-4 text-center">
          <button
            onClick={() => {
              onLogin();
              navigate('/dashboard');
            }}
            className="text-sm text-neutral-400 hover:text-white transition-colors"
          >
            🚀 Quick Demo Login (Skip credentials)
          </button>
        </div>
      </motion.div>
    </div>
  );
}
