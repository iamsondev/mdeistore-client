"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Timer, ArrowRight, Tag } from "lucide-react";

export function OfferHighlights({ medicines }: { medicines: any[] }) {
  // Try to use a specific medicine for the flash deal or fallback to undefined
  const flashMedicine = medicines && medicines.length > 3 ? medicines[3] : null;
  const secondaryMedicine = medicines && medicines.length > 4 ? medicines[4] : null;

  return (
    <section className="py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Main Flash Deal Card using real data (or fallback UI if unavailable) */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="group relative h-[450px] rounded-[2.5rem] overflow-hidden bg-zinc-900 shadow-2xl flex flex-col justify-end"
          >
            <img 
              src={flashMedicine?.image || "https://images.unsplash.com/photo-1547489432-cf93fa6c71ee?q=80&w=2070&auto=format&fit=crop"} 
              className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-1000"
              alt="Flash Sale"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-0" />
            
            <div className="relative z-10 p-12 text-white space-y-4">
              <div className="flex items-center gap-2 bg-red-600 w-fit px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest animate-pulse">
                <Timer className="h-3 w-3" />
                Limited Time Offer
              </div>
              <h3 className="text-4xl md:text-5xl font-black leading-tight">
                {flashMedicine ? (
                  <>Don't miss <span className="text-primary italic">{flashMedicine.name}</span></>
                ) : (
                  <>Flash Sale: Up to <span className="text-primary italic">60% OFF</span> on Wellness Products</>
                )}
              </h3>
              <p className="text-white/80 text-lg max-w-md font-medium">
                {flashMedicine ? `Grab this top quality product by ${flashMedicine.manufacturer} at only ৳${flashMedicine.price} now!` : "Don't miss out on our biggest health & beauty sale of the month."}
              </p>
              <Button asChild size="lg" className="w-fit rounded-full h-12 px-8 font-bold group/btn">
                <Link href={flashMedicine ? `/shop/${flashMedicine.id}` : "/shop"} className="flex items-center gap-2">
                  Shop Deal <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Secondary Cards Column */}
          <div className="flex flex-col gap-8">
            
            {/* Promo 1 (Static UI but maps logic) */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="group flex-1 relative rounded-[2rem] overflow-hidden bg-primary shadow-xl"
            >
              <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-white/10 skew-x-12 translate-x-12" />
              <div className="relative p-10 flex flex-col justify-center h-full space-y-4 text-white">
                <div className="flex items-center gap-2 text-white/80 text-xs font-bold uppercase tracking-widest">
                  <Tag className="h-3 w-3" />
                  New User Bonus
                </div>
                <h4 className="text-3xl font-black">Get ৳200 OFF on your first order!</h4>
                <p className="text-white/80 font-medium">Use code: <span className="bg-white/20 px-3 py-1 rounded-lg text-white font-mono">MEDI200</span></p>
                <div className="absolute right-10 top-1/2 -translate-y-1/2 text-8xl opacity-10 font-black italic hidden sm:block pointer-events-none">NEW</div>
              </div>
            </motion.div>

            {/* Promo 2 (Use another real medicine if available) */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
              className="group flex-1 relative rounded-[2rem] overflow-hidden bg-muted border-2 border-primary/20 shadow-xl"
            >
              <div className="relative p-10 flex items-center gap-6 h-full">
                {secondaryMedicine?.image ? (
                  <div className="h-24 w-24 rounded-2xl overflow-hidden shrink-0 shadow-sm border border-border">
                    <img src={secondaryMedicine.image} alt={secondaryMedicine.name} className="h-full w-full object-cover group-hover:scale-110 transition-transform" />
                  </div>
                ) : (
                  <div className="h-24 w-24 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Tag className="h-10 w-10 text-primary" />
                  </div>
                )}
                
                <div className="space-y-2">
                  <h4 className="text-2xl font-black leading-tight">
                    {secondaryMedicine ? `Trending: ${secondaryMedicine.name}` : "Free Delivery on orders above ৳1000"}
                  </h4>
                  <p className="text-muted-foreground font-medium text-sm">
                    {secondaryMedicine ? `Only ৳${secondaryMedicine.price} right now. Click to view.` : "Auto-applied at checkout. No code needed."}
                  </p>
                  <Link href={secondaryMedicine ? `/shop/${secondaryMedicine.id}` : "/shop"} className="text-primary font-bold inline-flex items-center gap-2 hover:underline">
                    View product <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
