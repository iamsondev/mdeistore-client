"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Eye, Star } from "lucide-react";

export function FeaturedMedicines({ medicines }: { medicines: any[] }) {
  return (
    <section className="py-24 px-6 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 space-y-4"
        >
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter">Featured <span className="text-primary">Medicines</span></h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-medium">
            Handpicked quality healthcare products delivered with care.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {medicines.map((medicine: any, idx) => (
            <motion.div
              key={medicine.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
              className="group bg-background rounded-[2.5rem] overflow-hidden border border-border hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500"
            >
              <div className="relative h-64 overflow-hidden p-4">
                <div className="absolute top-6 left-6 z-10">
                   <div className="px-3 py-1 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg shadow-primary/20">
                     Top Rated
                   </div>
                </div>
                <img
                  src={medicine.image || "https://placehold.co/400x300"}
                  alt={medicine.name}
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                   <Button asChild size="icon" className="rounded-full bg-white text-black hover:bg-primary hover:text-white transition-colors">
                      <Link href={`/shop/${medicine.id}`}><Eye className="h-5 w-5" /></Link>
                   </Button>
                   <Button size="icon" className="rounded-full bg-primary text-white hover:scale-110 transition-transform">
                      <ShoppingCart className="h-5 w-5" />
                   </Button>
                </div>
              </div>

              <div className="p-8 space-y-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star className="h-3.5 w-3.5 fill-amber-500" />
                    <span className="text-xs font-black uppercase tracking-widest">4.9 Rated</span>
                  </div>
                  <h3 className="text-xl font-black leading-tight group-hover:text-primary transition-colors">{medicine.name}</h3>
                  <p className="text-muted-foreground text-sm font-bold uppercase tracking-widest leading-none">
                    By {medicine.manufacturer}
                  </p>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-border/50">
                  <div className="space-y-0.5">
                    <p className="text-[10px] uppercase font-black tracking-[0.2em] text-muted-foreground">Price</p>
                    <p className="text-2xl font-black text-primary">৳{medicine.price}</p>
                  </div>
                  <Button asChild variant="secondary" className="rounded-full font-bold group-hover:bg-primary group-hover:text-white transition-colors">
                     <Link href={`/shop/${medicine.id}`}>Details</Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Button asChild variant="outline" size="lg" className="rounded-full px-12 h-14 font-black uppercase tracking-widest border-2 hover:bg-primary hover:text-white hover:border-primary transition-all active:scale-95">
            <Link href="/shop">Explore All Medicines</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
