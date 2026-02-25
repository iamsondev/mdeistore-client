"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Truck, Clock, Star } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "100% Authentic",
    desc: "All medicines are genuine and verified by our team",
    color: "text-blue-600",
    bg: "bg-blue-50 dark:bg-blue-950",
    border: "border-blue-200 dark:border-blue-800",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    desc: "Get your medicines delivered in 2-3 business days",
    color: "text-emerald-600",
    bg: "bg-emerald-50 dark:bg-emerald-950",
    border: "border-emerald-200 dark:border-emerald-800",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    desc: "Our support team is always ready to help you",
    color: "text-purple-600",
    bg: "bg-purple-50 dark:bg-purple-950",
    border: "border-purple-200 dark:border-purple-800",
  },
  {
    icon: Star,
    title: "Best Prices",
    desc: "Competitive prices with regular discounts and offers",
    color: "text-amber-600",
    bg: "bg-amber-50 dark:bg-amber-950",
    border: "border-amber-200 dark:border-amber-800",
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-16 px-6 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl font-bold mb-2">Why Choose MediStore?</h2>
          <p className="text-muted-foreground">
            We provide the best experience for your health needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map(
            ({ icon: Icon, title, desc, color, bg, border }, index) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
                className={`${bg} ${border} border-2 rounded-2xl p-6 text-center shadow-sm cursor-default`}
              >
                <motion.div
                  className={`${color} flex justify-center mb-4`}
                  whileHover={{ rotate: 10, scale: 1.2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Icon className="h-10 w-10" />
                </motion.div>
                <h3 className="font-bold text-lg mb-2">{title}</h3>
                <p className="text-muted-foreground text-sm">{desc}</p>
              </motion.div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
