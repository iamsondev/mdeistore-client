"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { MoveLeft, Pill, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import gsap from "gsap";

export default function NotFound() {
  const containerRef = useRef(null);
  const pillRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background animation
      gsap.to(".bg-orb", {
        x: "random(-50, 50)",
        y: "random(-50, 50)",
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 1,
      });

      // Pill float animation
      gsap.to(pillRef.current, {
        y: -30,
        rotation: 15,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });

      // Content fade in
      gsap.from(contentRef.current, {
        opacity: 0,
        y: 40,
        duration: 1.2,
        ease: "power4.out",
        delay: 0.2,
      });
      
      // Counter animation for 404
      gsap.from(".digit", {
        opacity: 0,
        scale: 0.5,
        y: 100,
        stagger: 0.1,
        duration: 1,
        ease: "back.out(1.7)",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background px-6"
    >
      {/* Animated Background Orbs */}
      <div className="bg-orb absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 blur-[100px] rounded-full pointer-events-none" />
      <div className="bg-orb absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/30 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-2xl w-full text-center relative z-10">
        <div ref={pillRef} className="inline-block mb-12">
          <div className="relative">
            <Pill className="h-24 w-24 text-primary opacity-20" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Pill className="h-16 w-16 text-primary shadow-2xl" />
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-4 mb-8">
           <span className="digit text-[120px] md:text-[180px] font-black leading-none text-primary/10 tracking-tighter">4</span>
           <span className="digit text-[120px] md:text-[180px] font-black leading-none text-primary tracking-tighter">0</span>
           <span className="digit text-[120px] md:text-[180px] font-black leading-none text-primary/10 tracking-tighter">4</span>
        </div>

        <div ref={contentRef}>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
             Oops! Prescription <span className="text-primary italic">Missing</span>.
          </h2>
          <p className="text-lg text-muted-foreground mb-12 max-w-lg mx-auto leading-relaxed">
            The medicine page you are looking for has been moved or expired. 
            Don&apos;t worry, our pharmacy is always open.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="rounded-full px-8 h-14 text-base font-bold shadow-lg shadow-primary/25 group transition-all hover:scale-105 active:scale-95">
              <Link href="/">
                <Home className="mr-2 h-5 w-5 transition-transform group-hover:-translate-y-1" />
                Go Home
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="rounded-full px-8 h-14 text-base font-bold group hover:bg-secondary/50 transition-all border-2 active:scale-95" onClick={() => window.history.back()}>
              <MoveLeft className="mr-2 h-5 w-5 transition-transform group-hover:-translate-x-2" />
              Get Back
            </Button>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-border/50 max-w-sm mx-auto">
          <p className="text-sm text-muted-foreground">
            Contact support if you believe this is an error: 
            <span className="text-primary font-semibold ml-1">support@medistore.com</span>
          </p>
        </div>
      </div>
    </div>
  );
}
