"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, MessageCircleQuestion } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    question: "How do I order prescription medicines?",
    answer: "To order prescription medicines, simply upload a clear photo or PDF of your valid prescription during the checkout process. Our certified pharmacists will verify it before dispensing."
  },
  {
    question: "Is delivery available nationwide?",
    answer: "Yes! We deliver to almost every part of the country. Delivery times vary between 24-72 hours depending on your exact location."
  },
  {
    question: "Are your medicines genuine?",
    answer: "Absolutely. We only source products from licensed manufacturers and verified distributors. Every batch is tracked to ensure authenticity."
  },
  {
    question: "What is your refund policy?",
    answer: "We offer a 7-day return policy for unopened and undamaged items. If you receive a wrong or expired item, we provide a full refund or replacement immediately."
  }
];

export function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="py-24 bg-primary/5">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-black uppercase tracking-widest">
            <MessageCircleQuestion className="h-4 w-4" />
            Common Questions
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter">Everything You <span className="text-primary">Need to Know</span></h2>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`border-2 rounded-[2rem] transition-all duration-300 overflow-hidden ${
                openIdx === idx ? 'border-primary bg-background shadow-xl shadow-primary/5' : 'border-border bg-background/50 hover:bg-background'
              }`}
            >
              <button
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="w-full px-8 py-7 flex items-center justify-between gap-4 text-left font-bold text-lg md:text-xl"
              >
                {faq.question}
                <div className={`shrink-0 h-10 w-10 rounded-full flex items-center justify-center transition-all ${
                  openIdx === idx ? 'bg-primary text-white rotate-180' : 'bg-muted text-muted-foreground hover:bg-primary/20 hover:text-primary'
                }`}>
                  {openIdx === idx ? <Minus className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                </div>
              </button>
              
              <AnimatePresence>
                {openIdx === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-8 pb-8 text-muted-foreground text-lg leading-relaxed font-medium">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
