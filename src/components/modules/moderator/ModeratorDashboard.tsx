"use client";

import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  MessageSquare, 
  ShieldAlert, 
  FileText, 
  CheckCircle, 
  Activity, 
  Users, 
  Bell, 
  ArrowUpRight,
  TrendingUp,
  AlertCircle
} from "lucide-react";
import gsap from "gsap";

interface ModeratorDashboardProps {
  userName?: string;
  stats?: {
    pendingReviews: number;
    totalProducts: number;
    pendingSellers: number;
    recentReviews: any[];
  };
}

const ModeratorDashboard: React.FC<ModeratorDashboardProps> = ({ userName, stats: realStats }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const bgCirclesRef = useRef<HTMLDivElement>(null);

  const displayStats = [
    {
      title: "Active Reviews",
      value: realStats?.pendingReviews || "0",
      change: "Live",
      icon: MessageSquare,
      color: "from-blue-500/20 to-indigo-500/20",
      textColor: "text-blue-600",
      borderColor: "border-blue-500/30",
    },
    {
      title: "Verified Products",
      value: realStats?.totalProducts || "0",
      change: "Stable",
      icon: Activity,
      color: "from-emerald-500/20 to-teal-500/20",
      textColor: "text-emerald-600",
      borderColor: "border-emerald-500/30",
    },
    {
      title: "Pending Sellers",
      value: realStats?.pendingSellers || "0",
      change: "Action Required",
      icon: Users,
      color: "from-amber-500/20 to-yellow-500/20",
      textColor: "text-amber-600",
      borderColor: "border-amber-500/30",
    },
    {
      title: "Reported Issues",
      value: "02",
      change: "Low",
      icon: ShieldAlert,
      color: "from-rose-500/20 to-orange-500/20",
      textColor: "text-rose-600",
      borderColor: "border-rose-500/30",
    },
  ];

  useEffect(() => {
    // GSAP background animation
    if (bgCirclesRef.current) {
      const circles = bgCirclesRef.current.children;
      gsap.to(circles, {
        x: "random(-100, 100)",
        y: "random(-100, 100)",
        scale: "random(0.8, 1.2)",
        duration: "random(15, 25)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: {
          amount: 8,
          from: "random",
        }
      });
    }

    // Hero content entrance
    if (heroRef.current) {
        gsap.fromTo(heroRef.current, 
            { opacity: 0, y: 50, scale: 0.95 },
            { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "elastic.out(1, 0.75)" }
        );
    }

    // Live Pulse Animation
    const pulseElement = document.getElementById("moderator-pulse");
    if (pulseElement) {
        gsap.to(pulseElement, {
            scale: 1.5,
            opacity: 0,
            duration: 1.5,
            repeat: -1,
            ease: "power2.out"
        });
    }
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <div ref={containerRef} className="w-full space-y-8 pb-12 overflow-hidden">
      {/* Dynamic Background */}
      <div 
        ref={bgCirclesRef} 
        className="fixed inset-0 pointer-events-none overflow-hidden -z-10 opacity-30 dark:opacity-20"
      >
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary blur-[100px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-secondary blur-[120px] rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent blur-[80px] rounded-full" />
      </div>

      {/* Hero Welcome Section */}
      <motion.div 
        ref={heroRef}
        className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-primary to-secondary p-8 md:p-12 text-white shadow-2xl shadow-primary/20"
      >
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-4 max-w-2xl">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm font-medium"
            >
              <div className="relative flex items-center justify-center h-2 w-2">
                <div id="moderator-pulse" className="absolute inset-0 bg-white rounded-full" />
                <div className="relative h-2 w-2 bg-white rounded-full" />
              </div>
              <span>Moderator Status: Active</span>
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-white">{userName || "Moderator"}</span>!
            </h1>
            <p className="text-white/80 text-lg md:text-xl font-medium max-w-lg">
              Manage reviews, monitor products, and ensure platform integrity.
            </p>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-accent/20 rounded-full blur-3xl" />
      </motion.div>

      {/* Statistics Grid */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {displayStats.map((stat, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ y: -8 }}
            className={`relative p-6 rounded-3xl border ${stat.borderColor} bg-card shadow-sm group transition-all duration-300 overflow-hidden`}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
            
            <div className="relative z-10 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-2xl bg-muted group-hover:bg-white/50 transition-colors`}>
                  <stat.icon className={`h-6 w-6 ${stat.textColor}`} />
                </div>
                <div className="flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-muted-foreground opacity-50">
                   {stat.change}
                </div>
              </div>
              
              <div>
                <p className="text-sm font-semibold text-muted-foreground group-hover:text-foreground transition-colors">
                  {stat.title}
                </p>
                <h3 className="text-3xl font-black">{stat.value}</h3>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity List - Using Real Reviews */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="lg:col-span-2 space-y-6"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Bell className="h-6 w-6 text-primary" />
              Latest Community Feed
            </h2>
          </div>

          <div className="space-y-4">
            {realStats?.recentReviews?.map((review, idx) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + (idx * 0.1) }}
                className="group flex items-center gap-4 p-4 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all"
              >
                <div className="p-3 rounded-xl bg-blue-100 text-blue-600">
                    <MessageSquare className="h-5 w-5" />
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <p className="font-bold text-sm">
                      <span className="text-primary">{review.User?.name || review.user?.name || "Anonymous"}</span>
                      <span className="text-muted-foreground font-normal ml-1">posted a {review.rating}★ review on</span>
                      <span className="ml-1 truncate max-w-[150px] inline-block align-bottom font-mono text-xs">{review.medicine?.name || "Product"}</span>
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 italic line-clamp-1">
                    "{review.comment}"
                  </p>
                </div>
              </motion.div>
            ))}
            {(!realStats?.recentReviews || realStats.recentReviews.length === 0) && (
              <div className="text-center py-10 text-muted-foreground font-medium bg-muted/20 rounded-2xl border border-dashed">
                No recent activity found.
              </div>
            )}
          </div>
        </motion.div>

        {/* Sidebar Cards */}
        <motion.div 
           initial={{ opacity: 0, x: 20 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ delay: 0.7 }}
           className="space-y-6"
        >
            <div className="p-6 rounded-[2rem] bg-card border border-border shadow-sm flex flex-col gap-6">
                <h3 className="font-bold text-lg flex items-center gap-2">
                    <Activity className="h-5 w-5 text-primary" />
                    Pending Actions
                </h3>
                
                <div className="space-y-3">
                    <div className="p-4 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-between">
                      <span className="text-sm font-semibold text-orange-700">Pending Sellers</span>
                      <span className="bg-orange-600 text-white text-[10px] font-black px-2 py-1 rounded-md">{realStats?.pendingSellers || 0}</span>
                    </div>
                    <div className="p-4 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-between">
                      <span className="text-sm font-semibold text-blue-700">Total Reviews</span>
                      <span className="bg-blue-600 text-white text-[10px] font-black px-2 py-1 rounded-md">{realStats?.pendingReviews || 0}</span>
                    </div>
                </div>
            </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ModeratorDashboard;

