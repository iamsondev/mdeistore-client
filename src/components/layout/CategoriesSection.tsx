"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Shapes, ArrowRight } from "lucide-react";

export function CategoriesSection({ categories }: { categories: any[] }) {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6 text-center md:text-left">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter">Browse by <span className="text-primary">Medical Category</span></h2>
          <p className="text-muted-foreground text-lg max-w-xl font-medium">
            Find exactly what you need by exploring our specialized departments.
          </p>
        </motion.div>
        <motion.div
           initial={{ opacity: 0, x: 20 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
        >
          <Link href="/shop" className="group flex items-center gap-2 text-primary font-bold text-lg">
            View All Categories <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
          </Link>
        </motion.div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {categories.map((cat, idx) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.05 }}
            whileHover={{ y: -8 }}
          >
            <Link
              href={`/shop?categoryId=${cat.id}`}
              className="group relative flex flex-col items-center justify-center p-8 bg-background border-2 border-border rounded-[2rem] hover:border-primary/40 hover:bg-primary/5 transition-all h-full shadow-sm"
            >
              <div className="mb-6 h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300">
                {cat.image ? (
                  <img src={cat.image} className="h-8 w-8 object-cover rounded shadow-sm" alt={cat.name} />
                ) : (
                  <Shapes className="h-8 w-8" />
                )}
              </div>
              <p className="font-black text-center text-lg">{cat.name}</p>
              <p className="text-xs text-muted-foreground mt-2 font-bold uppercase tracking-wider group-hover:text-primary transition-colors">Explore Now</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
