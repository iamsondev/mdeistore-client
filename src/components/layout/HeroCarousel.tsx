"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown, Pill, Heart, Package, ArrowRight, Shield, Clock, Star, Stethoscope } from "lucide-react";

const slides = [
  {
    id: 1,
    tag: "Prescription Medicines",
    tagIcon: Pill,
    eyebrow: "Trusted Since 2015",
    headline: "Your Trusted Online Pharmacy",
    highlight: "Delivered to Your Door",
    sub: "Order all your prescription medications from the comfort of home — fast, safe, and fully licensed delivery across the country.",
    stats: [
      { label: "Orders Delivered", value: "2M+" },
      { label: "Licensed Products", value: "10K+" },
      { label: "Customer Rating", value: "4.9★" },
    ],
    cta: { label: "Shop Now", href: "/shop?category=prescription" },
    ctaSecondary: { label: "View Catalog", href: "/shop" },
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=900&q=80",
    accentColor: "#2FA98C", // Teal Green
    gradientFrom: "from-[#060D0B]", // Dark forest base 1
    gradientVia: "via-[#0F241F]",   // Dark forest base 2
    chipColor: "bg-[#2FA98C]/15 border-[#2FA98C]/30 text-[#2FA98C]",
    badgeColor: "bg-[#2FA98C]",
  },
  {
    id: 2,
    tag: "OTC Medications",
    tagIcon: Package,
    eyebrow: "No Prescription Needed",
    headline: "Over-the-Counter Drugs",
    highlight: "At the Best Prices",
    sub: "All non-prescription medications in one place — browse easily, get them quickly, without ever leaving home.",
    stats: [
      { label: "OTC Products", value: "5K+" },
      { label: "Same-Day Dispatch", value: "99%" },
      { label: "Verified Brands", value: "300+" },
    ],
    cta: { label: "Shop Now", href: "/shop?category=otc" },
    ctaSecondary: { label: "View Catalog", href: "/shop" },
    image: "https://images.unsplash.com/photo-1550572017-edd951b55104?w=900&q=80",
    accentColor: "#FF6B35", // Contrast Orange
    gradientFrom: "from-[#0F0A07]", // Dark amber base 1
    gradientVia: "via-[#251610]",   // Dark amber base 2
    chipColor: "bg-[#FF6B35]/15 border-[#FF6B35]/30 text-[#FF6B35]",
    badgeColor: "bg-[#FF6B35]",
  },
  {
    id: 3,
    tag: "Health & Wellness",
    tagIcon: Heart,
    eyebrow: "Live Better Every Day",
    headline: "The Right Choices for",
    highlight: "A Healthier Life",
    sub: "Vitamins, supplements, and personal care essentials — everything you need for your well-being, curated by health experts.",
    stats: [
      { label: "Wellness Products", value: "3K+" },
      { label: "Happy Customers", value: "500K+" },
      { label: "Expert Curated", value: "100%" },
    ],
    cta: { label: "Shop Now", href: "/shop?category=wellness" },
    ctaSecondary: { label: "View Catalog", href: "/shop" },
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=900&q=80",
    accentColor: "#2FA98C", // Teal Green
    gradientFrom: "from-[#060D0B]",
    gradientVia: "via-[#0F241F]",
    chipColor: "bg-[#2FA98C]/15 border-[#2FA98C]/30 text-[#2FA98C]",
    badgeColor: "bg-[#2FA98C]",
  },
  {
    id: 4,
    tag: "Doctor Consultation",
    tagIcon: Stethoscope,
    eyebrow: "Expert Care, Anytime",
    headline: "Talk to a Licensed",
    highlight: "Doctor Online",
    sub: "Get professional medical advice from certified doctors — from diagnosis to prescription, all from the comfort of your home.",
    stats: [
      { label: "Verified Doctors", value: "1K+" },
      { label: "Consultations Done", value: "800K+" },
      { label: "Avg. Wait Time", value: "<5 min" },
    ],
    cta: { label: "Book Now", href: "/consult" },
    ctaSecondary: { label: "Learn More", href: "/consult/how-it-works" },
    image: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=900&q=80",
    accentColor: "#FF6B35", // Contrast Orange
    gradientFrom: "from-[#0F0A07]",
    gradientVia: "via-[#251610]",
    chipColor: "bg-[#FF6B35]/15 border-[#FF6B35]/30 text-[#FF6B35]",
    badgeColor: "bg-[#FF6B35]",
  },
];

const trustBadges = [
  { icon: Shield, label: "100% Authentic" },
  { icon: Clock, label: "Fast Delivery" },
  { icon: Star, label: "4.9 Rated" },
];

import { Medicine } from "@/types";

interface HeroCarouselProps {
  medicines?: Medicine[];
}

export function HeroCarousel({ medicines }: HeroCarouselProps) {
  return (
    <div className="relative overflow-hidden">
      <Carousel
        plugins={[Autoplay({ delay: 6000 })]}
        className="w-full relative group"
        opts={{ loop: true }}
      >
        <CarouselContent>
          {slides.map((slide) => {
            const TagIcon = slide.tagIcon;
            return (
              <CarouselItem key={slide.id}>
                <div
                  className={`relative h-[65vh] flex flex-col justify-center overflow-hidden bg-gradient-to-br ${slide.gradientFrom} ${slide.gradientVia} to-black`}
                >
                  {/* Background texture wrapper */}
                  <div
                    className="absolute inset-0 opacity-[0.02]"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                  />

                  {/* Soft Radial Glow */}
                  <div
                    className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[100px] opacity-25 pointer-events-none"
                    style={{ backgroundColor: slide.accentColor }}
                  />

                  <div className="container mx-auto px-6 md:px-16 relative z-10 flex flex-row items-center justify-between gap-12 h-full">

                    {/* Left Content */}
                    <motion.div
                      key={`content-${slide.id}`}
                      initial={{ opacity: 0, x: -40 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                      className="max-w-lg space-y-5 flex-1"
                    >
                      {/* Eyebrow */}
                      <motion.p
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/50"
                      >
                        {slide.eyebrow}
                      </motion.p>

                      {/* Tag Chip */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-bold leading-none ${slide.chipColor}`}
                      >
                        <TagIcon className="h-3.5 w-3.5" />
                        {slide.tag}
                      </motion.div>

                      {/* Headline */}
                      <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.25 }}
                      >
                        <h1 className="text-3xl md:text-[2.75rem] font-black leading-[1.1] tracking-tight text-white uppercase">
                          {slide.headline}{" "}
                          <span className="block italic" style={{ color: slide.accentColor }}>
                            {slide.highlight}
                          </span>
                        </h1>
                      </motion.div>

                      {/* Subtext */}
                      <motion.p
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.35 }}
                        className="text-sm text-white/60 leading-relaxed max-w-sm font-medium"
                      >
                        {slide.sub}
                      </motion.p>

                      {/* Glassmorphic Stats Row */}
                      <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="flex items-center gap-6 px-6 py-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md w-fit"
                      >
                        {slide.stats.map((stat, i) => (
                          <div key={i} className="flex flex-col">
                            <span className="text-lg font-black text-white leading-none mb-1">{stat.value}</span>
                            <span className="text-[9px] text-white/40 font-bold uppercase tracking-wider">{stat.label}</span>
                          </div>
                        ))}
                      </motion.div>

                      {/* Buttons */}
                      <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.45 }}
                        className="flex flex-wrap items-center gap-3 pt-1"
                      >
                        <Link
                          href={slide.cta.href}
                          className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold text-white transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl"
                          style={{
                            backgroundColor: slide.accentColor,
                            boxShadow: `0 8px 30px ${slide.accentColor}33`,
                          }}
                        >
                          {slide.cta.label}
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>

                        <Link
                          href={slide.ctaSecondary.href}
                          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold text-white border border-white/10 hover:border-white/20 hover:bg-white/10 bg-white/5 backdrop-blur-md transition-all duration-300 active:scale-95"
                        >
                          {slide.ctaSecondary.label}
                        </Link>
                      </motion.div>

                      {/* Trust Badges */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.55 }}
                        className="flex items-center gap-5 pt-3 border-t border-white/5 max-w-sm"
                      >
                        {trustBadges.map((badge, i) => {
                          const Icon = badge.icon;
                          return (
                            <div key={i} className="flex items-center gap-1.5 text-white/40 hover:text-white/60 transition-colors">
                              <Icon className="h-3.5 w-3.5 text-[#2FA98C]" />
                              <span className="text-[9px] font-bold uppercase tracking-widest leading-none">{badge.label}</span>
                            </div>
                          );
                        })}
                      </motion.div>
                    </motion.div>

                    {/* Right Image — Framed glass card with subtle scale hover */}
                    <motion.div
                      key={`image-${slide.id}`}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="hidden md:block relative w-[42%] h-[42vh] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl flex-shrink-0"
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 pointer-events-none" />

                      <img
                        src={slide.image}
                        alt={slide.tag}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-[6000ms] ease-out"
                      />

                      {/* Floating Verification Badge */}
                      <div
                        className="absolute bottom-6 left-6 z-20 flex items-center gap-2 px-4 py-2 rounded-full text-white text-[11px] font-black uppercase tracking-widest shadow-lg bg-[#071310]/80 backdrop-blur-md border border-[#2FA98C]/30"
                      >
                        <Shield className="h-3.5 w-3.5 text-[#2FA98C]" />
                        Verified Partner
                      </div>
                    </motion.div>
                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>

        {/* Navigation Arrows */}
        <div className="hidden md:block">
          <CarouselPrevious className="left-6 h-11 w-11 rounded-full border border-white/10 bg-white/5 text-white hover:bg-white/15 hover:border-white/20 backdrop-blur-sm transition-all duration-300" />
          <CarouselNext className="right-6 h-11 w-11 rounded-full border border-white/10 bg-white/5 text-white hover:bg-white/15 hover:border-white/20 backdrop-blur-sm transition-all duration-300" />
        </div>
      </Carousel>

      {/* Scroll Hint */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-14 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 text-white/20 pointer-events-none"
      >
        <span className="text-[9px] font-bold uppercase tracking-[0.4em]">Scroll</span>
        <ChevronDown className="h-4 w-4" />
      </motion.div>
    </div>
  );
}