"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Medicine } from "@/types/medicine.type";
import { ShoppingCart, Eye, Calendar, TrendingUp, Package, Info } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AddToCartButton } from "@/components/layout/AddToCartButton";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

export default function MedicineCard({ medicine }: { medicine: Medicine }) {
  const isOutOfStock = medicine.stock <= 0;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="h-full"
    >
      <Card className="h-full overflow-hidden border-border/40 shadow-xl shadow-black/5 hover:shadow-primary/5 transition-all duration-500 group flex flex-col rounded-[2rem] bg-card/50 backdrop-blur-sm">
        {/* ── Image Section ── */}
        <div className="relative h-56 w-full overflow-hidden bg-muted">
          {medicine.image ? (
            <Image
              src={medicine.image}
              alt={medicine.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-5xl bg-gradient-to-br from-primary/10 to-muted">
              🧪
            </div>
          )}

          {/* Overlays */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            <Badge className="bg-primary/90 hover:bg-primary backdrop-blur-md border-none shadow-lg text-[10px] font-black uppercase tracking-widest px-3 py-1">
              {typeof medicine.category === "object"
                ? medicine.category?.name || "General"
                : medicine.category || "General"}
            </Badge>
          </div>

          {!isOutOfStock && medicine.viewCount > 50 && (
            <Badge className="absolute top-4 right-4 bg-orange-500/90 hover:bg-orange-500 border-none shadow-lg text-[10px] font-black uppercase tracking-widest px-3 py-1 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" /> Popular
            </Badge>
          )}
        </div>

        {/* ── Header ── */}
        <CardHeader className="p-6 pb-2 space-y-1">
          <div className="flex justify-between items-start mb-1">
              <p className="text-[10px] text-primary font-black uppercase tracking-[0.2em]">
                {medicine.manufacturer}
              </p>
              <div className="flex items-center gap-1 text-muted-foreground">
                 <Calendar className="h-3 w-3" />
                 <span className="text-[10px] font-bold">{format(new Date(medicine.createdAt), "MMM d, yyyy")}</span>
              </div>
          </div>
          <CardTitle className="text-xl font-black text-zinc-900 line-clamp-1 group-hover:text-primary transition-colors">
            {medicine.name}
          </CardTitle>
          <p className="text-sm text-muted-foreground line-clamp-2 min-h-[40px] leading-relaxed font-medium">
            {medicine.description}
          </p>
        </CardHeader>

        {/* ── Meta Section ── */}
        <CardContent className="p-6 pt-2 flex-grow">
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-end">
              <div className="flex flex-col">
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Pricing</span>
                <span className="text-2xl font-black text-primary tracking-tighter">
                   ৳{medicine.price.toLocaleString()}
                </span>
              </div>
              
              <div className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all",
                isOutOfStock 
                  ? "bg-red-50 text-red-600 border-red-100" 
                  : "bg-green-50 text-green-600 border-green-100"
              )}>
                {isOutOfStock ? (
                  <Info className="h-3.5 w-3.5" />
                ) : (
                  <Package className="h-3.5 w-3.5" />
                )}
                {isOutOfStock ? "Out of Stock" : "In Stock"}
              </div>
            </div>

            {/* Micro Stats */}
            <div className="flex items-center gap-4 py-3 border-y border-border/40">
               <div className="flex items-center gap-1.5 ">
                  <Eye className="h-4 w-4 text-muted-foreground/60" />
                  <span className="text-xs font-bold text-muted-foreground">{medicine.viewCount} Views</span>
               </div>
               <div className="w-1 h-1 rounded-full bg-border" />
               <div className="flex items-center gap-1.5 ">
                  <span className="text-xs font-bold text-muted-foreground">{medicine.stock} Units left</span>
               </div>
            </div>
          </div>
        </CardContent>

        {/* ── Actions ── */}
        <CardFooter className="p-6 pt-0 gap-3">
          <Link href={`/shop/${medicine.id}`} className="flex-1">
            <Button variant="outline" className="w-full h-12 rounded-[1.25rem] border-2 border-border/60 font-black text-xs uppercase tracking-widest hover:bg-primary/5 hover:border-primary/30 transition-all active:scale-95 group/btn">
              <Eye className="h-4 w-4 mr-2 group-hover/btn:scale-110 transition-transform" /> Details
            </Button>
          </Link>

          <div className="flex-[1.5]">
            <AddToCartButton
              medicine={medicine}
              isAvailable={!isOutOfStock}
              compact
            />
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
