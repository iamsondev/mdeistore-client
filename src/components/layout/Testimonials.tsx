"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

const defaultTestimonials = [
  {
    name: "Rahat Hossain",
    role: "Regular Customer",
    image: "https://i.pravatar.cc/150?u=rahat",
    text: "MediStore has completely changed how I buy my chronic medications. Fast delivery and authentic products every time!",
    rating: 5
  },
  {
    name: "Sara Khan",
    role: "Mother of Two",
    image: "https://i.pravatar.cc/150?u=sara",
    text: "The baby care section is amazing. I can find everything I need for my kids at great prices. Highly recommended!",
    rating: 5
  },
  {
    name: "Dr. Ahmed",
    role: "Healthcare Professional",
    image: "https://i.pravatar.cc/150?u=ahmed",
    text: "As a doctor, I'm very selective about where my patients get their medicines. MediStore's verification process is top-notch.",
    rating: 4
  }
];

export function Testimonials({ reviews = [] }: { reviews?: any[] }) {
  // If we have real reviews, map them to the format we need
  const displayTestimonials = reviews.length > 0 
    ? reviews.slice(0, 6).map((r: any) => ({
        name: r.User?.name || "Customer",
        role: "Verified Purchase",
        image: r.User?.image || `https://i.pravatar.cc/150?u=${r.id}`,
        text: r.comment,
        rating: r.rating
      }))
    : defaultTestimonials;

  return (
    <section className="py-24 bg-muted/20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 space-y-4"
        >
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter">What Our <span className="text-primary">Customers Say</span></h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-medium">
            Join thousand of satisfied customers who trust us for their daily healthcare products.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayTestimonials.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-background border border-border rounded-[2rem] p-8 shadow-sm relative group"
            >
              <div className="absolute top-8 right-8 text-primary/10 group-hover:text-primary transition-colors">
                <Quote className="h-12 w-12" />
              </div>

              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-4 w-4 ${i < (t.rating || 5) ? 'fill-primary text-primary' : 'fill-muted text-muted'}`} />
                ))}
              </div>

              <p className="text-muted-foreground leading-relaxed mb-8 italic font-medium line-clamp-4">
                "{t.text}"
              </p>

              <div className="flex items-center gap-4 mt-auto">
                <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-primary/20 shrink-0">
                  <img src={t.image} alt={t.name} className="h-full w-full object-cover" />
                </div>
                <div className="min-w-0">
                  <h4 className="font-bold text-foreground truncate">{t.name}</h4>
                  <p className="text-xs font-medium text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

