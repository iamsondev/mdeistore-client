"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { 
  HelpCircle, 
  Search, 
  ChevronDown, 
  Truck, 
  CreditCard, 
  Package, 
  RefreshCcw, 
  ShieldCheck,
  MessageCircle
} from "lucide-react";

const faqs = [
  {
    category: "Ordering",
    icon: Package,
    items: [
      { q: "How do I place an order?", a: "To place an order, browse our shop, add medicines to your cart, and proceed to checkout. You will need to provide your delivery address and choose a payment method." },
      { q: "Can I cancel my order?", a: "Orders can only be canceled if they haven't been processed by the shop yet. Go to your dashboard to check the status of your order." },
      { q: "How can I track my order?", a: "Once your order is shipped, you will receive a tracking ID. You can also view real-time status updates in your dashboard under 'My Orders'." }
    ]
  },
  {
    category: "Payments",
    icon: CreditCard,
    items: [
      { q: "What payment methods are available?", a: "We currently support Online Payments via Stripe (Credit/Debit Cards) and Cash on Delivery for select regions." },
      { q: "Is my payment information secure?", a: "Absolutely. We use industry-standard encryption and Stripe's secure infrastructure to process all card payments. We never store your full card details." }
    ]
  },
  {
    category: "Delivery",
    icon: Truck,
    items: [
      { q: "How long does delivery take?", a: "Delivery typically takes 1-3 business days within major cities and 3-5 days for other regions." },
      { q: "What are the delivery charges?", a: "Delivery charges depend on your location and the pharmacy's distance from you. You can see the final cost on the checkout page." }
    ]
  },
  {
    category: "Refunds",
    icon: RefreshCcw,
    items: [
      { q: "What is your return policy?", a: "Due to safety regulations, we only accept returns for items that are damaged, expired, or incorrect upon delivery. Please report issues within 24 hours." },
      { q: "How long do refunds take?", a: "Refunds are usually processed within 5-7 business days back to your original payment method." }
    ]
  }
];

export default function HelpCenterPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState(faqs[0].category);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const currentCategory = faqs.find(f => f.category === activeCategory) || faqs[0];

  return (
    <div className="min-h-screen bg-background">
      {/* Search Header */}
      <section className="bg-zinc-950 py-24 relative overflow-hidden">
        <div className="container px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
             <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase">Help Center</h1>
             <p className="text-zinc-400 font-medium max-w-lg mx-auto italic">Everything you need to know about navigating the Medistore system.</p>
          </motion.div>

          <div className="max-w-2xl mx-auto mt-12 relative group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input 
              type="text"
              placeholder="Search for questions (e.g. 'delivery', 'payment')..."
              className="w-full h-16 pl-16 pr-6 rounded-full bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="absolute top-0 right-0 h-full w-1/3 bg-primary/10 blur-[150px] -z-0" />
      </section>

      <section className="py-20 container px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Sidebar Tabs */}
          <aside className="space-y-2">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-6 pl-4">Categories</p>
            {faqs.map((cat) => (
              <button
                key={cat.category}
                onClick={() => { setActiveCategory(cat.category); setExpandedIndex(null); }}
                className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl font-bold transition-all ${
                  activeCategory === cat.category 
                    ? "bg-primary text-white shadow-lg shadow-primary/20 scale-[1.02]" 
                    : "hover:bg-secondary text-muted-foreground"
                }`}
              >
                <cat.icon className="h-5 w-5" />
                {cat.category}
              </button>
            ))}
            
            <div className="mt-12 p-8 rounded-[2rem] bg-zinc-900 text-white relative overflow-hidden group">
               <div className="relative z-10 space-y-4">
                  <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center">
                     <MessageCircle className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-black italic">Still need some help?</p>
                  <button className="text-[10px] uppercase font-bold tracking-widest text-primary hover:underline transition-all">Start Chatting Now</button>
               </div>
               <div className="absolute -bottom-10 -right-10 h-32 w-32 bg-primary/20 rounded-full blur-3xl group-hover:bg-primary/40 transition-all" />
            </div>
          </aside>

          {/* FAQ Content */}
          <div className="lg:col-span-3 space-y-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-10 w-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                <currentCategory.icon className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-black uppercase tracking-tighter">{currentCategory.category} Questions</h2>
            </div>

            <div className="space-y-4">
              {currentCategory.items.map((item, i) => (
                 <div 
                   key={i}
                   className="rounded-[2rem] border border-border/60 bg-card overflow-hidden transition-all hover:border-primary/40"
                 >
                    <button 
                      onClick={() => setExpandedIndex(expandedIndex === i ? null : i)}
                      className="w-full flex items-center justify-between p-7 text-left group"
                    >
                      <span className="font-bold text-lg group-hover:text-primary transition-colors">{item.q}</span>
                      <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform duration-300 ${expandedIndex === i ? "rotate-180" : ""}`} />
                    </button>
                    <AnimatePresence>
                      {expandedIndex === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="px-7 pb-7 text-muted-foreground font-medium leading-relaxed italic border-t border-border/40 pt-4"
                        >
                          {item.a}
                        </motion.div>
                      )}
                    </AnimatePresence>
                 </div>
              ))}
            </div>

            <div className="mt-12 p-10 rounded-[2.5rem] bg-emerald-50 dark:bg-emerald-950/20 border-2 border-dashed border-emerald-500/20 flex flex-col items-center text-center space-y-4">
               <ShieldCheck className="h-10 w-10 text-emerald-500" />
               <p className="text-sm font-bold opacity-80 max-w-lg">
                 All our medical information is verified by licensed pharmaceutical experts. 
                 Your health safety is our absolute priority.
               </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
