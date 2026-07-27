"use client";

import { useState } from "react";
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
import { Eye, TrendingUp, Package, Info } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AddToCartButton } from "@/components/layout/AddToCartButton";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function MedicineCard({ medicine }: { medicine: Medicine }) {
  const isOutOfStock = medicine.stock <= 0;
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="h-full"
    >
      <Card className="h-full overflow-hidden border-border/50 shadow-md hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 group flex flex-col rounded-2xl bg-card">
        {/* ── Image Section ── */}
        <div className="relative h-44 w-full overflow-hidden bg-muted/60 shrink-0">
          {medicine.image && !imgError ? (
            <Image
              src={medicine.image}
              alt={medicine.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="flex h-full items-center justify-center text-4xl bg-gradient-to-br from-primary/10 to-muted">
              🧪
            </div>
          )}

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
            <Badge className="bg-background/90 text-foreground backdrop-blur-md border border-border/50 shadow-sm text-[10px] font-bold px-2.5 py-0.5 rounded-full">
              {typeof medicine.category === "object"
                ? medicine.category?.name || "General"
                : medicine.category || "General"}
            </Badge>
          </div>

          {!isOutOfStock && medicine.viewCount > 50 && (
            <Badge className="absolute top-3 right-3 bg-amber-500 text-white border-none shadow-md text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <TrendingUp className="h-3 w-3" /> Hot
            </Badge>
          )}
        </div>

        {/* ── Header & Content ── */}
        <div className="p-4 flex flex-col flex-1 gap-2">
          <div>
            <p className="text-[11px] text-primary font-bold uppercase tracking-wider line-clamp-1">
              {medicine.manufacturer}
            </p>
            <CardTitle className="text-base font-bold text-foreground line-clamp-1 group-hover:text-primary transition-colors mt-0.5">
              {medicine.name}
            </CardTitle>
          </div>

          <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed font-normal flex-1">
            {medicine.description}
          </p>

          {/* Price & Stock status */}
          <div className="flex items-center justify-between pt-2 border-t border-border/40 mt-auto">
            <div>
              <span className="text-xs text-muted-foreground font-medium block">Price</span>
              <span className="text-lg font-black text-primary tracking-tight">
                ৳{medicine.price.toLocaleString()}
              </span>
            </div>

            <div
              className={cn(
                "flex items-center gap-1 px-2.5 py-1 rounded-full border text-[10px] font-bold uppercase tracking-wider",
                isOutOfStock
                  ? "bg-destructive/10 text-destructive border-destructive/20"
                  : "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800"
              )}
            >
              {isOutOfStock ? (
                <Info className="h-3 w-3" />
              ) : (
                <Package className="h-3 w-3" />
              )}
              {isOutOfStock ? "Out of Stock" : "In Stock"}
            </div>
          </div>
        </div>

        {/* ── Actions ── */}
        <CardFooter className="p-4 pt-0 gap-2 shrink-0">
          <Link href={`/shop/${medicine.id}`} className="flex-1">
            <Button
              variant="outline"
              size="sm"
              className="w-full h-9 rounded-xl border-border font-bold text-xs hover:bg-muted transition-all"
            >
              <Eye className="h-3.5 w-3.5 mr-1.5" /> Details
            </Button>
          </Link>

          <div className="flex-[1.4]">
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
