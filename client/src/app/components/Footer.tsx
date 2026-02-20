import { Github, Twitter, Linkedin, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-neutral-950 border-t border-white/5 py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <div
              className="text-2xl mb-6 bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent"
              style={{ fontWeight: 800 }}
            >
              SkillBarter
            </div>
            <p className="text-neutral-400 text-sm leading-relaxed max-w-xs">
              Empowering students to exchange skills and unlock unlimited
              learning opportunities through fair credit exchange.
            </p>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-white mb-6 font-bold uppercase tracking-widest text-xs">
              Platform
            </h4>
            <ul className="space-y-3 text-sm text-neutral-400">
              <li>
                <a
                  href="#how-it-works"
                  className="hover:text-brand-primary transition-all duration-300"
                >
                  How it Works
                </a>
              </li>
              <li>
                <a
                  href="#features"
                  className="hover:text-brand-primary transition-all duration-300"
                >
                  Platform Features
                </a>
              </li>
              <li>
                <a
                  href="#testimonials"
                  className="hover:text-brand-primary transition-all duration-300"
                >
                  Student Success
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white mb-6 font-bold uppercase tracking-widest text-xs">
              Knowledge
            </h4>
            <ul className="space-y-3 text-sm text-neutral-400">
              <li>
                <a
                  href="#"
                  className="hover:text-brand-primary transition-all duration-300"
                >
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-brand-primary transition-all duration-300"
                >
                  Safety Guidelines
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-brand-primary transition-all duration-300"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-white mb-6 font-bold uppercase tracking-widest text-xs">
              Connect
            </h4>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-neutral-900 border border-white/5 flex items-center justify-center hover:bg-brand-primary/10 hover:border-brand-primary/20 transition-all duration-300 group"
              >
                <Twitter className="w-5 h-5 text-neutral-400 group-hover:text-brand-primary" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-neutral-900 border border-white/5 flex items-center justify-center hover:bg-brand-primary/10 hover:border-brand-primary/20 transition-all duration-300 group"
              >
                <Github className="w-5 h-5 text-neutral-400 group-hover:text-brand-primary" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-neutral-900 border border-white/5 flex items-center justify-center hover:bg-brand-primary/10 hover:border-brand-primary/20 transition-all duration-300 group"
              >
                <Linkedin className="w-5 h-5 text-neutral-400 group-hover:text-brand-primary" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-neutral-500 font-medium">
            © {new Date().getFullYear()} SkillBarter. All rights reserved.
          </p>
          <p className="text-sm text-neutral-500 font-medium flex items-center gap-2">
            Build with{" "}
            <span className="text-brand-secondary animate-pulse">❤️</span> for
            students
          </p>
        </div>
      </div>
    </footer>
  );
}
