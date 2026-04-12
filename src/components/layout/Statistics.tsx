"use client";

import { motion } from "framer-motion";
import { Users, ShoppingBag, Truck, Shapes } from "lucide-react";
import { useEffect, useState, useRef } from "react";

interface StatProps {
  medicineCount: number;
  categoryCount: number;
  customerCount?: number;
  orderCount?: number;
}

function AnimatedCount({ value }: { value: number }) {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    let start = 0;
    const end = value;
    if (end === 0) return;
    const duration = 2000;
    const increment = end / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value]);

  return <span>{count.toLocaleString()}</span>;
}

export function Statistics({ medicineCount, categoryCount, customerCount = 0, orderCount = 0 }: StatProps) {
  const stats = [
    {
      label: "Available Products",
      value: medicineCount || 0,
      suffix: "+",
      icon: ShoppingBag,
      color: "text-blue-600",
      bg: "bg-blue-50 dark:bg-blue-950/30",
    },
    {
      label: "Medicine Categories",
      value: categoryCount || 0,
      suffix: "",
      icon: Shapes,
      color: "text-emerald-600",
      bg: "bg-emerald-50 dark:bg-emerald-950/30",
    },
    {
      label: "Deliveries Completed",
      value: orderCount || 8500, // Fallback to 8500 if DB is empty for demo
      suffix: "+",
      icon: Truck,
      color: "text-amber-600",
      bg: "bg-amber-50 dark:bg-amber-950/30",
    },
    {
      label: "Satisfied Customers",
      value: customerCount || 12000, // Fallback to 12000 if DB is empty for demo
      suffix: "+",
      icon: Users,
      color: "text-purple-600",
      bg: "bg-purple-50 dark:bg-purple-950/30",
    },
  ];

  return (
    <section className="py-20 bg-primary/5 border-y border-primary/10 overflow-hidden relative">
      <div className="absolute top-10 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse delay-700 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="text-center group"
            >
              <div className={`mx-auto w-16 h-16 rounded-2xl ${stat.bg} shadow-md flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300`}>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
              <h3 className="text-4xl md:text-5xl font-black text-foreground mb-2">
                <AnimatedCount value={stat.value} />{stat.suffix}
              </h3>
              <p className="text-muted-foreground font-bold uppercase tracking-widest text-xs">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

