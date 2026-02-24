import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useInView } from "./useInView";
import { Star, StarHalf, Quote, Sparkles } from "lucide-react";

const testimonials = [
  {
    name: "Rohan Verma",
    role: "3rd Year CS Student, Delhi",
    avatar: "RV",
    rating: 4.5,
    text: "I didn’t expect it to be this useful for college. I taught Python basics and ended up learning graphic design for my side projects. The credit system actually makes sense.",
    skills: "Taught: Python • Learned: Design",
    color: "from-blue-500/20 to-cyan-500/20",
  },
  {
    name: "Ananya Sharma",
    role: "Business Major, Mumbai",
    avatar: "AS",
    rating: 4.5,
    text: "I was unsure at first, but after my first Spanish session, it felt very natural. The people here are genuinely helpful.",
    skills: "Taught: Spanish • Learned: Marketing",
    color: "from-purple-500/20 to-pink-500/20",
  },
  {
    name: "Ethan Miller",
    role: "Engineering Student, Toronto",
    avatar: "EM",
    rating: 4,
    text: "The sessions run smoothly and scheduling is simple. I’ve done quite a few web dev exchanges and even picked up some music production along the way.",
    skills: "Taught: Web Dev • Learned: Music",
    color: "from-orange-500/20 to-red-500/20",
  },
  {
    name: "Priya Desai",
    role: "Art Student, Ahmedabad",
    avatar: "PD",
    rating: 4.8,
    text: "As an art student, I couldn’t really afford coding classes. Teaching illustration in exchange made it possible. It worked out better than I expected.",
    skills: "Taught: Illustration • Learned: Coding",
    color: "from-emerald-500/20 to-teal-500/20",
  },
  {
    name: "Daniel Brooks",
    role: "Economics Student, Boston",
    avatar: "DB",
    rating: 4.3,
    text: "Everything just works smoothly — booking, credits, sessions. I’ve also met some very sharp people through it.",
    skills: "Taught: Economics • Learned: Photography",
    color: "from-indigo-500/20 to-blue-500/20",
  },
  {
    name: "Adrien Lambert",
    role: "Medical Student, Paris",
    avatar: "AL",
    rating: 4.4,
    text: "I exchanged basic first aid lessons for help with data analysis for my research. It was practical and honestly very efficient.",
    skills: "Taught: First Aid • Learned: Data Analysis",
    color: "from-rose-500/20 to-orange-500/20",
  },
  {
    name: "Liam Wilson",
    role: "Physics Major, Chicago",
    avatar: "LW",
    rating: 4.6,
    text: "I needed help with calculus, and in return I helped someone with Photoshop. Simple idea, but very effective.",
    skills: "Taught: Photoshop • Learned: Calculus",
    color: "from-cyan-500/20 to-blue-500/20",
  },
  {
    name: "Chloe Baker",
    role: "Psychology Student, London",
    avatar: "CB",
    rating: 4.5,
    text: "I traded public speaking guidance for UI/UX sessions. My portfolio improved a lot because of that exchange.",
    skills: "Taught: Public Speaking • Learned: UI/UX",
    color: "from-fuchsia-500/20 to-purple-500/20",
  },
  {
    name: "Tanvi Bhatia",
    role: "Music Student, Jaipur",
    avatar: "TB",
    rating: 4.7,
    text: "I found someone to teach me basic Japanese, and I helped them with piano lessons. It felt very organic and relaxed.",
    skills: "Taught: Piano • Learned: Japanese",
    color: "from-amber-500/20 to-orange-500/20",
  },
  {
    name: "Krish Agarwal",
    role: "History Major, Lucknow",
    avatar: "KA",
    rating: 4.6,
    text: "I needed Excel skills for my internship. I helped a coding student with creative writing and got solid practical help in return.",
    skills: "Taught: Writing • Learned: Excel",
    color: "from-lime-500/20 to-emerald-500/20",
  },
  {
    name: "Ren Takahashi",
    role: "Sports Science Student, Tokyo",
    avatar: "RT",
    rating: 4.4,
    text: "I exchanged personal training sessions for French lessons. It’s refreshing to learn something outside my major like this.",
    skills: "Taught: Fitness • Learned: French",
    color: "from-blue-600/20 to-indigo-600/20",
  },
  {
    name: "Devansh Khanna",
    role: "Biochemistry Major, Chandigarh",
    avatar: "DK",
    rating: 4.7,
    text: "I helped someone with organic chemistry and learned how to cook properly in return. Definitely didn’t expect that kind of exchange.",
    skills: "Taught: Chemistry • Learned: Cooking",
    color: "from-red-500/20 to-rose-500/20",
  },
];

function RatingStars({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <div className="flex gap-1 mb-3">
      {[...Array(fullStars)].map((_, i) => (
        <Star
          key={`full-${i}`}
          className="w-4 h-4 fill-yellow-400 text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]"
        />
      ))}
      {hasHalfStar && (
        <StarHalf className="w-4 h-4 fill-yellow-400 text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]" />
      )}
      {[...Array(5 - Math.ceil(rating))].map((_, i) => (
        <Star key={`empty-${i}`} className="w-4 h-4 text-neutral-700" />
      ))}
    </div>
  );
}

function TestimonialCard({
  testimonial,
}: {
  testimonial: (typeof testimonials)[number];
}) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      whileHover={{ y: -12, scale: 1.02 }}
      className="relative w-[340px] md:w-[400px] flex-shrink-0 group cursor-default transition-all duration-300"
    >
      <div
        className={`glass-strong rounded-2xl p-6 h-full border border-white/5 bg-neutral-900/40 relative overflow-hidden transition-all duration-500 group-hover:border-brand-primary/40 group-hover:bg-neutral-900/60 shadow-2xl group-hover:shadow-[0_20px_40px_rgba(139,92,246,0.15)]`}
      >
        {/* Intensified Spotlight Effect */}
        <div
          className="pointer-events-none absolute -inset-px transition-opacity duration-300"
          style={{
            opacity: isHovering ? 1 : 0,
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(139, 92, 246, 0.25), transparent 40%)`,
          }}
        />

        {/* Floating background icon */}
        <Quote className="absolute top-4 right-4 w-12 h-12 text-white/5 group-hover:text-brand-primary/10 transition-colors duration-500" />

        <div className="relative z-10 flex flex-col h-full">
          {/* Rating */}
          <RatingStars rating={testimonial.rating} />

          {/* Testimonial text */}
          <p className="text-neutral-300 mb-4 leading-relaxed text-sm md:text-base font-medium flex-grow italic">
            "{testimonial.text}"
          </p>

          <div className="space-y-3">
            {/* Skills Badge */}
            <div
              className={`px-4 py-1.5 rounded-xl bg-gradient-to-r ${testimonial.color} border border-white/10 backdrop-blur-sm self-start`}
            >
              <p className="text-[10px] md:text-xs font-black text-white uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
                {testimonial.skills}
              </p>
            </div>

            {/* Author */}
            <div className="flex items-center gap-4 border-t border-white/5 pt-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-primary to-brand-primary/40 flex items-center justify-center text-background shadow-xl shadow-brand-primary/20 transform group-hover:rotate-6 transition-transform duration-500 text-lg font-black">
                {testimonial.avatar}
              </div>
              <div>
                <div className="text-white text-base font-bold group-hover:text-brand-primary transition-colors">
                  {testimonial.name}
                </div>
                <div className="text-[11px] text-neutral-500 font-semibold tracking-wide">
                  {testimonial.role}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function Marquee({
  items,
  direction = "left",
  speed = 40,
  parallaxValue,
}: {
  items: typeof testimonials;
  direction?: "left" | "right";
  speed?: number;
  parallaxValue: any;
}) {
  return (
    <div className="flex overflow-hidden relative max-w-[1264px] mx-auto group">
      {/* Gradient Overlays */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-neutral-950 to-transparent z-20 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-neutral-950 to-transparent z-20 pointer-events-none" />

      <motion.div style={{ x: parallaxValue }} className="flex gap-8 py-6">
        <motion.div
          animate={{
            x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
          }}
          transition={{
            duration: speed,
            ease: "linear",
            repeat: Infinity,
          }}
          className="flex gap-8"
          style={{ width: "max-content" }}
        >
          {/* Render twice for seamless loop */}
          {[...items, ...items].map((testimonial, idx) => (
            <TestimonialCard key={idx} testimonial={testimonial} />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}

export function Testimonials() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { ref, inView } = useInView();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Smooth parallax scroll offsets for each row
  const x1 = useTransform(scrollYProgress, [0, 1], [-150, 150]);
  const x2 = useTransform(scrollYProgress, [0, 1], [150, -150]);

  const row1 = testimonials.slice(0, 6);
  const row2 = testimonials.slice(6, 12);

  return (
    <section
      id="testimonials"
      ref={(node) => {
        if (node) {
          sectionRef.current = node;
          (ref as any).current = node;
        }
      }}
      className="py-20 bg-neutral-950 relative overflow-hidden"
    >
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full border border-brand-primary/20 bg-brand-primary/5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-primary"></span>
            </span>
            <span className="text-brand-primary text-xs font-black tracking-widest uppercase">
              Endorsements
            </span>
          </div>
          <h2 className="text-5xl md:text-7xl mb-6 text-white tracking-tighter font-black">
            Real Stories,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-blue-400">
              Real Impact.
            </span>
          </h2>
          <p className="text-xl text-neutral-400 max-w-2xl mx-auto font-medium leading-relaxed">
            The community that learns together, grows together. Hear from our
            successful barters.
          </p>
        </motion.div>
      </div>

      <div className="relative space-y-6 overflow-hidden px-4 md:px-0">
        <Marquee items={row1} direction="left" speed={35} parallaxValue={x1} />
        <Marquee items={row2} direction="right" speed={40} parallaxValue={x2} />
      </div>

      <div className="container mx-auto px-6 mt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="glass-strong p-10 rounded-[32px] border border-white/5 flex flex-wrap justify-around items-center gap-12 text-center"
        >
          <div>
            <div className="text-4xl font-black text-white mb-2">4.7/5</div>
            <div className="text-[10px] text-neutral-500 uppercase tracking-[0.4em] font-black">
              Average Rating
            </div>
          </div>
          <div className="w-px h-16 bg-white/10 hidden md:block" />
          <div>
            <div className="text-4xl font-black text-white mb-2">15k+</div>
            <div className="text-[10px] text-neutral-500 uppercase tracking-[0.4em] font-black">
              Skills Swapped
            </div>
          </div>
          <div className="w-px h-16 bg-white/10 hidden md:block" />
          <div>
            <div className="text-4xl font-black text-white mb-2">100%</div>
            <div className="text-[10px] text-neutral-500 uppercase tracking-[0.4em] font-black">
              Free Forever
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
