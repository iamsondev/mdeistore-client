"use client";

import { motion } from "framer-motion";
import { Truck, Package, CheckCircle, Clock, MapPin, Star } from "lucide-react";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { DeliverOrderButton } from "./DeliverOrderButton";

interface DeliveryDashboardProps {
  userName?: string;
  stats?: {
    assignedToday: number;
    inTransit: number;
    deliveredToday: number;
    recentAssignments: any[];
  };
}

export function DeliveryDashboard({ userName, stats: realStats }: DeliveryDashboardProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  const displayStats = [
    { title: "Assigned Total", value: realStats?.assignedToday || "0", icon: Package, color: "from-blue-500/20 to-indigo-500/20", textColor: "text-blue-600", border: "border-blue-500/30" },
    { title: "In Transit", value: realStats?.inTransit || "0", icon: Truck, color: "from-amber-500/20 to-orange-500/20", textColor: "text-amber-600", border: "border-amber-500/30" },
    { title: "Delivered", value: realStats?.deliveredToday || "0", icon: CheckCircle, color: "from-emerald-500/20 to-teal-500/20", textColor: "text-emerald-600", border: "border-emerald-500/30" },
    { title: "My Rating", value: "5.0★", icon: Star, color: "from-purple-500/20 to-pink-500/20", textColor: "text-purple-600", border: "border-purple-500/30" },
  ];

  useEffect(() => {
    if (heroRef.current) {
      gsap.fromTo(heroRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      );
    }
    if (bgRef.current) {
      gsap.to(bgRef.current.children, {
        x: "random(-80, 80)",
        y: "random(-80, 80)",
        duration: "random(12, 20)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: { amount: 6, from: "random" },
      });
    }
  }, []);

  return (
    <div className="w-full space-y-8 pb-12 overflow-hidden">
      {/* Animated BG */}
      <div ref={bgRef} className="fixed inset-0 pointer-events-none -z-10 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-400 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-blue-400 blur-[100px] rounded-full" />
      </div>

      {/* Hero */}
      <motion.div
        ref={heroRef}
        className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-amber-500 to-orange-600 p-8 md:p-12 text-white shadow-2xl shadow-amber-500/20"
      >
        <div className="relative z-10 space-y-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-sm font-medium"
          >
            <Truck className="h-4 w-4" />
            Agent ID: #D-{userName?.slice(0,3).toUpperCase() || "NEW"}
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-extrabold">
            Hello,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-white">
              {userName || "Agent"}
            </span>
            ! 🚴
          </h1>
          <p className="text-white/80 text-lg max-w-lg">
            You have {realStats?.assignedToday || 0} active assignments waiting for action.
          </p>
        </div>
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-orange-300/20 rounded-full blur-3xl" />
      </motion.div>

      {/* Stats */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {displayStats.map((stat, i) => (
          <motion.div
            key={i}
            variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
            whileHover={{ y: -6 }}
            className={`relative p-5 rounded-3xl border ${stat.border} bg-card shadow-sm overflow-hidden group`}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
            <div className="relative z-10">
              <div className={`p-2.5 rounded-xl bg-muted inline-flex mb-3`}>
                <stat.icon className={`h-5 w-5 ${stat.textColor}`} />
              </div>
              <p className="text-2xl font-black">{stat.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{stat.title}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Current Assigned Orders */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <MapPin className="h-5 w-5 text-amber-500" />
          Active Assignments Queue
        </h2>
        {realStats?.recentAssignments?.map((order, i) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex flex-col md:flex-row md:items-center gap-4 p-5 rounded-[2rem] bg-card border border-border/60 hover:border-amber-500/50 hover:shadow-xl hover:shadow-amber-500/5 transition-all group relative overflow-hidden"
          >
            <div className={`p-4 rounded-2xl shrink-0 ${order.status === "DELIVERED" ? "bg-emerald-100 text-emerald-600" : order.status === "SHIPPED" ? "bg-blue-100 text-blue-600" : "bg-amber-100 text-amber-600"}`}>
              <Truck className="h-6 w-6" />
            </div>
            
            <div className="flex-1 min-w-0 space-y-1">
              <div className="flex items-center gap-2">
                 <p className="font-black text-lg tracking-tight truncate">{order.customer?.name || "Customer"}</p>
                 <span className="text-[10px] font-black text-muted-foreground/40 uppercase tracking-tighter">#{order.id.slice(0,8)}</span>
              </div>
              <p className="text-xs font-bold text-muted-foreground line-clamp-1 flex items-center gap-1 italic">
                 <MapPin className="h-3 w-3" /> {order.address}
              </p>
            </div>

            <div className="flex items-center justify-between md:justify-end gap-6 shrink-0 mt-4 md:mt-0">
              <div className="text-right">
                <p className="font-black text-lg text-emerald-600">৳{Number(order.totalAmount).toLocaleString()}</p>
                <span className={`text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest ${order.status === "DELIVERED" ? "bg-emerald-100 text-emerald-700" : order.status === "SHIPPED" ? "bg-blue-100 text-blue-700" : "bg-amber-100 text-amber-700"}`}>
                  {order.status}
                </span>
              </div>

                   <DeliverOrderButton orderId={order.id} currentStatus={order.status} />
            </div>
            
            {/* Soft background line */}
            <div className="absolute top-0 right-0 h-1 w-full bg-gradient-to-r from-transparent via-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.div>
        ))}
        {(!realStats?.recentAssignments || realStats.recentAssignments.length === 0) && (
          <div className="text-center py-12 text-muted-foreground border-2 border-dashed rounded-3xl">
            No active assignments found.
          </div>
        )}
      </div>


      {/* Quick Info */}
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-2xl border border-border bg-card p-5">
          <h3 className="font-bold mb-3 flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" />
            On-Time Rate
          </h3>
          <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "92%" }}
              transition={{ duration: 1.5, delay: 1 }}
              className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full"
            />
          </div>
          <p className="text-right text-sm font-black text-emerald-600 mt-1">92%</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5">
          <h3 className="font-bold mb-3 flex items-center gap-2">
            <Star className="h-4 w-4 text-primary" />
            Customer Rating
          </h3>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className={`h-6 w-6 ${s <= 4 ? "text-amber-400 fill-amber-400" : "text-muted-foreground"}`} />
            ))}
          </div>
          <p className="text-sm text-muted-foreground mt-1">Based on 127 deliveries</p>
        </div>
      </div>
    </div>
  );
}
