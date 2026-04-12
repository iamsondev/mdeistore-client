"use client";

import { motion } from "framer-motion";
import { Pill, Clock, ChevronRight, User } from "lucide-react";

const posts = [
  {
    id: 1,
    title: "Understanding Modern Pharmaceutical Logistics",
    excerpt: "How cold-chain technology is changing the way we receive delicate medications at home.",
    category: "Technology",
    author: "Dr. Ariful Islam",
    date: "April 12, 2024",
    image: "https://images.unsplash.com/photo-1586015555751-63bb77f4322a?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Top 10 Vitamins for Immune System Support",
    excerpt: "Strengthen your body's natural defenses with these essential nutrients and lifestyle tips.",
    category: "Wellness",
    author: "Sara Ahmed",
    date: "April 10, 2024",
    image: "https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Managing Chronic Pain: A New Approach",
    excerpt: "Exploring non-addictive alternatives and holistic strategies for long-term health management.",
    category: "Health",
    author: "Dr. Kevin Chen",
    date: "April 08, 2024",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=800&auto=format&fit=crop"
  }
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background pb-24">
      <section className="bg-zinc-950 py-24 relative overflow-hidden">
        <div className="container px-4 text-center relative z-10">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase italic"
          >
            Health <span className="text-primary not-italic">Journal</span>
          </motion.h1>
          <p className="text-zinc-400 mt-6 text-lg max-w-xl mx-auto font-medium">
            Expert insights, medical breakthroughs, and wellness tips from our trusted health professionals.
          </p>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/10 blur-[120px] rounded-full -z-0" />
      </section>

      <section className="container px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {posts.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer flex flex-col h-full"
            >
              <div className="relative h-64 w-full rounded-[2rem] overflow-hidden mb-6 shadow-xl group-hover:shadow-primary/10 transition-all">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute top-4 left-4 px-4 py-1.5 rounded-full bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md text-[10px] font-black uppercase tracking-widest text-primary shadow-sm">
                  {post.category}
                </div>
              </div>

              <div className="flex-1 space-y-4 px-2">
                <div className="flex items-center gap-4 text-xs font-bold text-muted-foreground uppercase tracking-widest">
                   <div className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" />
                      {post.date}
                   </div>
                   <div className="flex items-center gap-1.5 line-clamp-1">
                      <User className="h-3.5 w-3.5" />
                      {post.author}
                   </div>
                </div>

                <h2 className="text-2xl font-black tracking-tight leading-tight group-hover:text-primary transition-colors">
                  {post.title}
                </h2>
                
                <p className="text-muted-foreground leading-relaxed font-medium line-clamp-2 italic">
                   "{post.excerpt}"
                </p>

                <div className="pt-4 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary group-hover:gap-4 transition-all">
                   Read Full Article
                   <ChevronRight className="h-4 w-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Newsletter Callout */}
        <div className="mt-24 p-12 md:p-16 rounded-[3rem] bg-secondary/50 border border-border relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-12">
           <div className="space-y-4 max-w-lg">
              <h2 className="text-3xl font-black tracking-tight uppercase">Subscribe to the Dose</h2>
              <p className="text-muted-foreground font-medium italic">Get the latest medical news and exclusive health tips delivered straight to your inbox weekly.</p>
           </div>
           <div className="flex w-full md:w-auto items-center gap-3">
              <input type="email" placeholder="Your Email Address" className="h-14 px-8 rounded-full bg-background border border-border focus:border-primary outline-none font-bold w-full md:w-[300px]" />
              <button className="h-14 px-10 bg-primary text-white font-black uppercase tracking-widest rounded-full hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20">Sign Up</button>
           </div>
           <Pill className="absolute -bottom-10 -right-10 h-40 w-40 text-primary/5 -rotate-12" />
        </div>
      </section>
    </div>
  );
}
