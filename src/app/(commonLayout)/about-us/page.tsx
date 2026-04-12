"use client";

import { motion } from "framer-motion";
import { Pill, Heart, Users, Globe, Award, ShieldCheck } from "lucide-react";

export default function AboutUsPage() {
  const stats = [
    { label: "Founded", value: "2024", icon: Pill },
    { label: "Medicines", value: "10k+", icon: Heart },
    { label: "Happy Users", value: "50k+", icon: Users },
    { label: "Global Partners", value: "100+", icon: Globe },
  ];

  const values = [
    { title: "Integrity", description: "Standardized medications directly from verified manufacturers.", icon: ShieldCheck },
    { title: "Excellence", description: "Superior logistics ensuring your health essentials reach you in record time.", icon: Award },
    { title: "Customer-First", description: "Personalized care and 24/7 support for all your medical needs.", icon: Heart },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-zinc-950">
        <div className="absolute inset-0 opacity-40">
           <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary blur-[120px] rounded-full animate-pulse" />
           <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500 blur-[120px] rounded-full animate-pulse delay-700" />
        </div>
        <div className="container px-4 relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase"
          >
            Revolutionizing <br/> <span className="text-primary italic">Digital Pharmacy</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-zinc-400 mt-6 text-lg max-w-2xl mx-auto font-medium"
          >
            At Medistore, we blend cutting-edge technology with pharmaceutical expertise 
            to make healthcare accessible, affordable, and authentic for everyone.
          </motion.p>
        </div>
      </section>

      <section className="py-24 container px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-black tracking-tighter uppercase text-primary">Our Story</h2>
            <p className="text-muted-foreground leading-relaxed text-lg">
              Born out of a vision to simplify healthcare, Medistore started as a small digital platform in Dhaka. 
              Today, it stands as one of the most trusted digital healthcare providers, bridging the gap 
              between licensed pharmacies and millions of households.
            </p>
            <p className="text-muted-foreground leading-relaxed text-lg">
              We leverage AI-driven systems and cold-chain logistics to ensure every medicine you receive 
              is stored and delivered under optimal conditions.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                whileHover={{ y: -5 }}
                className="p-6 rounded-3xl bg-secondary/50 border border-border flex flex-col items-center text-center space-y-2"
              >
                <stat.icon className="h-8 w-8 text-primary mb-2" />
                <span className="text-3xl font-black tracking-tighter">{stat.value}</span>
                <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-zinc-50 dark:bg-zinc-900/40">
        <div className="container px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-black tracking-tighter uppercase">Our Core Values</h2>
            <div className="h-1.5 w-24 bg-primary mx-auto rounded-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((v, i) => (
              <div key={v.title} className="p-8 rounded-[2.5rem] bg-background border border-border hover:shadow-2xl transition-all group">
                <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                  <v.icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-black mb-3">{v.title}</h3>
                <p className="text-muted-foreground leading-relaxed font-medium">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join the journey */}
      <section className="py-24 container px-4">
         <div className="rounded-[3rem] bg-primary p-12 overflow-hidden relative">
            <div className="relative z-10 text-center text-white space-y-6">
               <h2 className="text-4xl md:text-5xl font-black tracking-tight italic">Together, Let's build a Healthier Future.</h2>
               <p className="text-primary-foreground/80 max-w-xl mx-auto font-medium">Interested in partnering with us or joining our rapidly growing team?</p>
               <button className="px-10 py-4 bg-white text-primary font-black uppercase tracking-widest rounded-full hover:scale-105 transition-transform shadow-xl">Contact Our HQ</button>
            </div>
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-emerald-400/20 rounded-full blur-3xl" />
         </div>
      </section>
    </div>
  );
}
