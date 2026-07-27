"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar, User } from "lucide-react";
import Link from "next/link";

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=800&auto=format&fit=crop";

const blogs = [
  {
    title: "10 Essential Tips for a Healthy Heart",
    excerpt: "Learn how simple lifestyle changes can significantly improve your cardiovascular health and longevity...",
    image: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?q=80&w=800&auto=format&fit=crop",
    date: "Oct 15, 2025",
    author: "Dr. Smith",
    tag: "Health Tips"
  },
  {
    title: "Understanding Generic vs. Branded Medicines",
    excerpt: "Are generic medicines just as effective? We break down the science and cost benefits for your wallet...",
    image: "https://images.unsplash.com/photo-1628771065518-0d82f1938462?q=80&w=800&auto=format&fit=crop",
    date: "Oct 12, 2025",
    author: "Pharmacy Team",
    tag: "Education"
  },
  {
    title: "The Rise of Telemedicine in 2025",
    excerpt: "How digital health platforms are making healthcare accessible to everyone, everywhere, at any time...",
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=800&auto=format&fit=crop",
    date: "Oct 10, 2025",
    author: "Health Tech",
    tag: "Innovation"
  }
];

export function LatestBlogs() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter">Latest <span className="text-primary">Medical Insights</span></h2>
            <p className="text-muted-foreground text-lg max-w-xl font-medium">
              Stay informed with our curated health tips, industry news, and expert articles.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link href="/blog" className="group flex items-center gap-2 text-primary font-bold text-lg">
              View All Articles <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {blogs.map((blog, idx) => (
            <motion.div
              key={blog.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group flex flex-col h-full bg-background rounded-3xl overflow-hidden shadow-sm border border-border hover:shadow-xl hover:shadow-primary/5 transition-all"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={blog.image} 
                  alt={blog.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = FALLBACK_IMAGE;
                  }}
                />
                <div className="absolute top-4 left-4 bg-primary text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full">
                  {blog.tag}
                </div>
              </div>
              
              <div className="p-8 flex flex-col flex-1 space-y-4">
                <div className="flex items-center gap-6 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    {blog.date}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5" />
                    {blog.author}
                  </div>
                </div>

                <h3 className="text-2xl font-black leading-tight group-hover:text-primary transition-colors">
                  {blog.title}
                </h3>
                
                <p className="text-muted-foreground font-medium line-clamp-2">
                  {blog.excerpt}
                </p>

                <div className="mt-auto pt-6 border-t border-border/50">
                  <Link href="/blog" className="inline-flex items-center gap-2 font-black text-sm uppercase tracking-widest hover:text-primary transition-colors">
                    Read Article <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
