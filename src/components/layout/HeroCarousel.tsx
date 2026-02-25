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
    image: "https://i.ibb.co.com/7s0RXCX/one.jpg",
    emoji: "💊",
  },
  {
    title: "Genuine Medicines, Guaranteed",
    subtitle: "100% authentic products from verified sellers",
    image: "https://i.ibb.co.com/CRcP96r/three.jpg",
    emoji: "✅",
  },
  {
    title: "Fast & Safe Delivery",
    subtitle: "Get your medicines delivered in 2-3 business days",
    image: "https://i.ibb.co.com/jkJykwzy/two.jpg",
    emoji: "🚚",
  },
  {
    title: "Best Prices Guaranteed",
    subtitle: "Competitive prices with regular discounts and offers",
    image: "https://i.ibb.co.com/dJt9RrWM/four.jpg",
    emoji: "⭐",
  },
];

export function HeroCarousel() {
  return (
    <Carousel plugins={[Autoplay({ delay: 4000 })]} className="w-full">
      <CarouselContent>
        {slides.map((slide, index) => (
          <CarouselItem key={index}>
            <div
              className="relative py-32 px-6 text-center text-white min-h-[500px] flex flex-col items-center justify-center"
              style={{
                backgroundImage: `url(${slide.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/20" />

              {/* Content */}
              <div className="relative z-10">
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
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-4 bg-white/20 border-white/30 text-white hover:bg-white/30" />
      <CarouselNext className="right-4 bg-white/20 border-white/30 text-white hover:bg-white/30" />
    </Carousel>
  );
}
