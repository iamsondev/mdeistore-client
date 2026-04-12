"use client";

import { motion } from "framer-motion";
import { Send, Bell, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function NewsletterSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="bg-zinc-900 rounded-[3rem] p-8 md:p-20 overflow-hidden relative shadow-2xl shadow-primary/10">
          
          {/* Internal Graphics */}
          <div className="absolute top-10 right-10 opacity-20 hidden lg:block">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Bell className="h-40 w-40 text-primary" />
            </motion.div>
          </div>

          <div className="max-w-3xl space-y-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white text-xs font-black uppercase tracking-widest"
            >
              <CheckCircle2 className="h-4 w-4 text-primary" />
              Join 10,000+ Health Conscious Subscribers
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tighter"
            >
              Get Health Tips & <br />
              <span className="text-primary italic">Exclusive Deals</span> Weekly.
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-zinc-400 text-lg md:text-xl font-medium max-w-xl"
            >
              Subscribe to stay ahead with curated medical articles and early access to flash sales. No spam, just wellness.
            </motion.p>

            <motion.form 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 max-w-md pt-4"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="relative flex-1">
                <Input 
                  placeholder="name@example.com" 
                  className="h-14 bg-white/5 border-white/10 text-white rounded-2xl px-6 focus-visible:ring-primary shadow-inner"
                />
              </div>
              <Button size="lg" className="h-14 px-8 rounded-2xl font-black uppercase tracking-widest gap-2 bg-primary hover:bg-primary/90 transition-transform active:scale-95 shadow-lg shadow-primary/20 shrink-0">
                Subscribe <Send className="h-4 w-4" />
              </Button>
            </motion.form>
          </div>

        </div>
      </div>
    </section>
  );
}
