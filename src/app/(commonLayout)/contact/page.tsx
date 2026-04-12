"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, MessageSquare } from "lucide-react";

export default function ContactUsPage() {
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <section className="bg-zinc-950 py-24 text-center">
        <div className="container px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase"
          >
            Get In <span className="text-primary italic">Touch</span>
          </motion.h1>
          <p className="text-zinc-400 mt-6 text-lg max-w-xl mx-auto italic font-medium">
            Have questions about your medications or technical issues? Our elite support team is ready to assist.
          </p>
        </div>
      </section>

      <section className="container px-4 -mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Info Cards */}
          <div className="lg:col-span-1 space-y-4">
            <div className="p-8 rounded-[2rem] bg-card border border-border shadow-xl space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs font-black text-muted-foreground uppercase tracking-widest">Email Us</p>
                  <p className="font-bold">support@medistore.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs font-black text-muted-foreground uppercase tracking-widest">Call Registry</p>
                  <p className="font-bold">+880 1234 567890</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs font-black text-muted-foreground uppercase tracking-widest">HQ Location</p>
                  <p className="font-bold">Gulshan-2, Dhaka, BD</p>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-[2rem] bg-primary text-white relative overflow-hidden">
               <div className="relative z-10 space-y-4">
                  <MessageSquare className="h-8 w-8 mb-2" />
                  <h3 className="text-xl font-black italic">Live Assistance</h3>
                  <p className="text-sm font-medium opacity-80">Our pharmacists are available for live consultation every day from 9 AM to 10 PM.</p>
                  <button className="px-6 py-3 bg-white text-primary rounded-xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform">Start Live Chat</button>
               </div>
               <div className="absolute top-0 right-0 -mr-10 -mt-10 h-32 w-32 bg-white/10 rounded-full blur-2xl" />
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2 p-10 md:p-16 rounded-[3rem] bg-card border border-border shadow-2xl">
            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">Full Identity</label>
                    <input type="text" placeholder="Your Name" className="w-full h-14 px-6 rounded-2xl bg-muted/50 border border-transparent focus:border-primary focus:bg-background transition-all font-bold outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">Digital Address</label>
                    <input type="email" placeholder="Your Email" className="w-full h-14 px-6 rounded-2xl bg-muted/50 border border-transparent focus:border-primary focus:bg-background transition-all font-bold outline-none" />
                  </div>
               </div>

               <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">Subject Header</label>
                  <input type="text" placeholder="How can we help?" className="w-full h-14 px-6 rounded-2xl bg-muted/50 border border-transparent focus:border-primary focus:bg-background transition-all font-bold outline-none" />
               </div>

               <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">Message Payload</label>
                  <textarea rows={5} placeholder="Type your detailed inquiry here..." className="w-full p-6 rounded-[2rem] bg-muted/50 border border-transparent focus:border-primary focus:bg-background transition-all font-bold outline-none resize-none"></textarea>
               </div>

               <button className="w-full h-16 bg-primary text-white rounded-2xl font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:shadow-xl hover:shadow-primary/20 hover:scale-[1.01] active:scale-95 transition-all">
                  <Send className="h-5 w-5" />
                  Transmit Message
               </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
