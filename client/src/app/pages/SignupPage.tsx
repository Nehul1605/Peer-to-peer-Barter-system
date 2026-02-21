import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';

interface SignupPageProps {
  onSignup: () => void;
}

export default function SignupPage({ onSignup }: SignupPageProps) {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock signup - in real app, this would create account
    onSignup();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[var(--background)] text-white flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/20 via-brand-secondary/20 to-brand-primary/20 animate-gradient" />
      
      {/* Floating orbs */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-brand-secondary/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-brand-primary/20 rounded-full blur-3xl animate-pulse delay-1000" />

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

        {/* Signup Form */}
        <div className="bg-neutral-900/40 backdrop-blur-xl border border-neutral-800 rounded-2xl p-8 shadow-2xl">
          <h2 className="text-2xl mb-2">Create Account</h2>
          <p className="text-neutral-400 mb-6">Join the skill exchange community</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-neutral-300">Full Name</Label>
              <div className="relative mt-1">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10 bg-neutral-900/40 border-neutral-800 text-white placeholder:text-neutral-500"
                  required
                />
              </div>
            </div>

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

            <div className="text-sm text-neutral-400">
              <label className="flex items-start gap-2 cursor-pointer">
                <input type="checkbox" className="mt-1 rounded border-neutral-800 bg-neutral-900/40" required />
                <span>
                  I agree to the{' '}
                  <a href="#" className="text-brand-primary hover:text-brand-primary">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-brand-primary hover:text-brand-primary">
                    Privacy Policy
                  </a>
                </span>
              </label>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-brand-primary to-brand-secondary hover:from-brand-primary hover:to-brand-secondary text-white group"
            >
              Create Account
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-neutral-400">
            Already have an account?{' '}
            <Link to="/login" className="text-brand-primary hover:text-brand-primary">
              Sign in
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
