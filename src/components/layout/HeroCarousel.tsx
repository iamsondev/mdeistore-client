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
    image: "https://i.ibb.co.com/6RWxnRby/pexels-anhdanghihi-16398464.jpg",
    accentColor: "hsl(221, 83%, 53%)",
    gradientFrom: "from-blue-950",
    gradientVia: "via-blue-900",
    chipColor: "bg-blue-500/20 border-blue-400/30 text-blue-300",
    badgeColor: "bg-blue-500",
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
    image: "https://i.ibb.co.com/5Xth5T8t/pexels-artempodrez-5878514.jpg",
    accentColor: "hsl(142, 71%, 45%)",
    gradientFrom: "from-emerald-950",
    gradientVia: "via-emerald-900",
    chipColor: "bg-emerald-500/20 border-emerald-400/30 text-emerald-300",
    badgeColor: "bg-emerald-500",
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
    image: "https://i.ibb.co.com/XZ6c0DXT/pexels-lucas-guimaraes-bueno-258458556-13060576.jpg",
    accentColor: "hsl(330, 81%, 60%)",
    gradientFrom: "from-rose-950",
    gradientVia: "via-rose-900",
    chipColor: "bg-rose-500/20 border-rose-400/30 text-rose-300",
    badgeColor: "bg-rose-500",
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
    image: "https://i.ibb.co.com/prk5W6Jt/pexels-n-voitkevich-7615570.jpg",
    accentColor: "hsl(262, 83%, 65%)",
    gradientFrom: "from-violet-950",
    gradientVia: "via-violet-900",
    chipColor: "bg-violet-500/20 border-violet-400/30 text-violet-300",
    badgeColor: "bg-violet-600",
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
                  className={`relative h-[65vh] flex flex-col justify-center overflow-hidden bg-gradient-to-br ${slide.gradientFrom} ${slide.gradientVia} to-gray-950`}
                >
                  {/* Background texture */}
                  <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                  />

                  {/* Radial glow */}
                  <div
                    className="absolute top-1/3 left-1/4 w-[600px] h-[600px] rounded-full blur-[120px] opacity-20 pointer-events-none"
                    style={{ backgroundColor: slide.accentColor }}
                  />

                  {/* Right glow behind image */}
                  <div
                    className="absolute top-1/2 right-[15%] -translate-y-1/2 w-[400px] h-[400px] rounded-full blur-[80px] opacity-30 pointer-events-none"
                    style={{ backgroundColor: slide.accentColor }}
                  />

                  <div className="container mx-auto px-6 md:px-16 relative z-10 flex flex-row items-center justify-between gap-8 h-full">

                    {/* Left Content */}
                    <motion.div
                      key={`content-${slide.id}`}
                      initial={{ opacity: 0, x: -40 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                      className="max-w-lg space-y-4 flex-1"
                    >
                      {/* Eyebrow */}
                      <motion.p
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40"
                      >
                        {slide.eyebrow}
                      </motion.p>

                      {/* Tag Chip */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-semibold ${slide.chipColor}`}
                      >
                        <TagIcon className="h-3 w-3" />
                        {slide.tag}
                      </motion.div>

                      {/* Headline */}
                      <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.25 }}
                      >
                        <h1 className="text-3xl md:text-[2.75rem] font-black leading-[1.1] tracking-tight text-white">
                          {slide.headline}{" "}
                          <span className="block" style={{ color: slide.accentColor }}>
                            {slide.highlight}
                          </span>
                        </h1>
                      </motion.div>

                      {/* Subtext */}
                      <motion.p
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.35 }}
                        className="text-sm text-white/50 leading-relaxed max-w-sm"
                      >
                        {slide.sub}
                      </motion.p>

                      {/* Stats Row */}
                      <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="flex items-center gap-5"
                      >
                        {slide.stats.map((stat, i) => (
                          <div key={i} className="flex flex-col">
                            <span className="text-lg font-black text-white">{stat.value}</span>
                            <span className="text-[10px] text-white/35 font-medium uppercase tracking-wider">{stat.label}</span>
                          </div>
                        ))}
                      </motion.div>

                      {/* Buttons */}
                      <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="flex flex-wrap items-center gap-3 pt-1"
                      >
                        <Link
                          href={slide.cta.href}
                          className="group inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-white transition-all duration-300 hover:gap-3 active:scale-95"
                          style={{
                            backgroundColor: slide.accentColor,
                            boxShadow: `0 0 24px ${slide.accentColor}44`,
                          }}
                        >
                          {slide.cta.label}
                          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                        </Link>

                        <Link
                          href={slide.ctaSecondary.href}
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-white/60 border border-white/10 hover:border-white/25 hover:text-white bg-white/5 backdrop-blur-sm transition-all duration-300 active:scale-95"
                        >
                          {slide.ctaSecondary.label}
                        </Link>
                      </motion.div>

                      {/* Trust badges inline */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="flex items-center gap-5 pt-1"
                      >
                        {trustBadges.map((badge, i) => {
                          const Icon = badge.icon;
                          return (
                            <div key={i} className="flex items-center gap-1.5 text-white/30">
                              <Icon className="h-3 w-3" />
                              <span className="text-[10px] font-semibold uppercase tracking-widest">{badge.label}</span>
                            </div>
                          );
                        })}
                      </motion.div>
                    </motion.div>

                    {/* Right Image — full bleed into slide edge */}
                    <motion.div
                      key={`image-${slide.id}`}
                      initial={{ opacity: 0, x: 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="hidden md:block relative self-stretch flex-shrink-0 w-[38%]"
                    >
                      {/* Glow behind image */}
                      <div
                        className="absolute inset-0 blur-3xl opacity-25 scale-90"
                        style={{ backgroundColor: slide.accentColor }}
                      />

                      {/* Image fills full height of slide */}
                      <img
                        src={slide.image}
                        alt={slide.tag}
                        className="absolute inset-0 w-full h-full object-cover object-center"
                        style={{
                          maskImage: "linear-gradient(to right, transparent 0%, black 30%)",
                          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 30%)",
                        }}
                      />

                      {/* Badge pill floating on image */}
                      <div
                        className={`absolute bottom-8 left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full text-white text-[11px] font-bold shadow-xl ${slide.badgeColor}`}
                      >
                        <Shield className="h-3 w-3" />
                        Verified & Licensed
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
        className="absolute bottom-14 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 text-white/25 pointer-events-none"
      >
        <span className="text-[9px] font-bold uppercase tracking-[0.4em]">Scroll</span>
        <ChevronDown className="h-4 w-4" />
      </motion.div>
    </div>
  );
}