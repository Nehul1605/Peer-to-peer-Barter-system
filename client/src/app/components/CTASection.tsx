import React from "react";
import { Link } from "react-router-dom";

export function CTASection() {
  return (
    <section className="bg-black py-40 text-center relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-black to-black opacity-50" />

        <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">
           <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-8 text-white max-w-4xl">
              Start your learning journey <br/>
              <span className="text-neutral-500">today.</span>
           </h2>
           <p className="text-neutral-400 text-lg md:text-xl font-light mb-12 max-w-xl mx-auto leading-relaxed">
              Join thousands of learners in the most collaborative skill exchange community.
           </p>

           <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
               <Link to="/signup">
                  <button className="h-12 px-8 rounded-full bg-white text-black font-medium hover:bg-neutral-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]">
                     Sign up for free
                  </button>
               </Link>
           </div>
        </div>
    </section>
  );
}
