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

const slides = [
  {
    title: "Your Trusted Online Medicine Shop",
    subtitle: "Browse 100+ OTC medicines and get delivered fast",
    bg: "from-blue-600 to-indigo-700",
    emoji: "💊",
  },
  {
    title: "Genuine Medicines, Guaranteed",
    subtitle: "100% authentic products from verified sellers",
    bg: "from-emerald-600 to-teal-700",
    emoji: "✅",
  },
  {
    title: "Fast & Safe Delivery",
    subtitle: "Get your medicines delivered in 2-3 business days",
    bg: "from-purple-600 to-violet-700",
    emoji: "🚚",
  },
];

export function HeroCarousel() {
  return (
    <Carousel plugins={[Autoplay({ delay: 3000 })]} className="w-full">
      <CarouselContent>
        {slides.map((slide, index) => (
          <CarouselItem key={index}>
            <div
              className={`bg-gradient-to-br ${slide.bg} py-24 px-6 text-center text-white`}
            >
              <p className="text-6xl mb-4">{slide.emoji}</p>
              <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
                {slide.title}
              </h1>
              <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto">
                {slide.subtitle}
              </p>
              <div className="flex gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-zinc-900 hover:bg-zinc-100"
                >
                  <Link href="/shop">Browse Medicines</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                >
                  <Link href="/register">Get Started</Link>
                </Button>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-4 bg-white/20 border-white/30 text-white hover:bg-white/30" />
      <CarouselNext className="right-4 bg-white/20 border-white/30 text-white hover:bg-white/30" />
    </Carousel>
  );
}
