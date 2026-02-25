"use client";

import { motion } from "framer-motion";
import { Search, ShoppingCart, Package } from "lucide-react";

const steps = [
  {
    icon: Search,
    step: "01",
    title: "Browse Medicines",
    desc: "Search and filter from 100+ OTC medicines by category, price, or manufacturer",
    color: "text-blue-600",
    bg: "bg-blue-50 dark:bg-blue-950",
    border: "border-blue-200 dark:border-blue-800",
    number: "bg-blue-600",
  },
  {
    icon: ShoppingCart,
    step: "02",
    title: "Add to Cart",
    desc: "Add your medicines to cart and review your order before checkout",
    color: "text-emerald-600",
    bg: "bg-emerald-50 dark:bg-emerald-950",
    border: "border-emerald-200 dark:border-emerald-800",
    number: "bg-emerald-600",
  },
  {
    icon: Package,
    step: "03",
    title: "Get Delivered",
    desc: "Place your order with Cash on Delivery and get it in 2-3 business days",
    color: "text-purple-600",
    bg: "bg-purple-50 dark:bg-purple-950",
    border: "border-purple-200 dark:border-purple-800",
    number: "bg-purple-600",
  },
];

export function HowItWorks() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl font-extrabold mb-3">How It Works</h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Order your medicines in just 3 simple steps
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-16 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-blue-300 via-emerald-300 to-purple-300 z-0" />

          {steps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03 }}
              className={`relative z-10 ${step.bg} ${step.border} border-2 rounded-2xl p-8 text-center shadow-sm`}
            >
              <div
                className={`${step.number} text-white text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-4`}
              >
                {step.step}
              </div>

              <div className={`${step.color} flex justify-center mb-4`}>
                <step.icon className="h-12 w-12" />
              </div>

              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
