import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface MedistoreLogoProps {
  showText?: boolean;
  className?: string;
  size?: number;
  asLink?: boolean;
  /** Variant for dark backgrounds (like deep green sidebar) */
  light?: boolean;
}

export function MedistoreLogo({
  showText = true,
  className,
  size = 36,
  asLink = true,
  light = false,
}: MedistoreLogoProps) {
  const inner = (
    <span className={cn("flex items-center gap-2.5 group select-none", className)}>
      {/* Icon */}
      <span
        className="relative shrink-0 rounded-xl overflow-hidden ring-1 ring-primary/40 shadow-md transition-shadow duration-300 group-hover:shadow-[0_0_14px_#2FA98C66]"
        style={{ width: size, height: size }}
      >
        <Image
          src="/logo.png"
          alt="Medistore"
          fill
          sizes={`${size}px`}
          className="object-cover"
          priority
        />
      </span>

      {/* Wordmark */}
      {showText && (
        <span className="flex flex-col leading-none gap-[2px]">
          <span
            className={cn(
              "font-serif font-bold tracking-tight transition-colors",
              light ? "text-[#2FA98C]" : "text-[#1B4D3E] dark:text-[#2FA98C]"
            )}
            style={{ fontSize: size * 0.53 }}
          >
            Medistore
          </span>
          <span
            className={cn(
              "uppercase tracking-[0.18em] font-semibold",
              light ? "text-white/45" : "text-muted-foreground dark:text-white/40"
            )}
            style={{ fontSize: size * 0.23 }}
          >
            Health Central
          </span>
        </span>
      )}
    </span>
  );

  if (asLink) {
    return (
      <Link href="/" aria-label="Go to Medistore homepage">
        {inner}
      </Link>
    );
  }

  return inner;
}
