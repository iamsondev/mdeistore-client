"use client";

import Link from "next/link";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const footerLinks = {
  shop: [
    { title: "All Medicines", href: "/shop" },
    { title: "Prescription Drugs", href: "/shop?category=prescription" },
    { title: "Health & Wellness", href: "/shop?category=wellness" },
    { title: "Personal Care", href: "/shop?category=beauty" },
    { title: "Baby Care", href: "/shop?category=baby" },
  ],
  company: [
    { title: "About Us", href: "/about" },
    { title: "Contact Us", href: "/contact" },
    { title: "Privacy Policy", href: "/privacy" },
    { title: "Terms of Service", href: "/terms" },
    { title: "Refund Policy", href: "/refund" },
  ],
  support: [
    { title: "FAQs", href: "/faq" },
    { title: "Order Tracking", href: "/orders" },
    { title: "Shipping Info", href: "/shipping" },
    { title: "Healthcare Blog", href: "/blog" },
    { title: "Pharmacist Help", href: "/help" },
  ],
};

const Footer = () => {
  return (
    <footer className="bg-secondary/50 border-t pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-8">
            <Link href="/" className="flex items-center gap-2 group w-fit">
              <div className="bg-primary p-2 rounded-xl group-hover:rotate-12 transition-transform duration-300">
                <img
                  src="https://i.ibb.co.com/Nd7y9BKL/Logo-with-Abstract-Shelf-Icon.png"
                  className="h-8 w-auto invert"
                  alt="MediStore Logo"
                />
              </div>
            </Link>
            <p className="text-muted-foreground text-base leading-relaxed max-w-sm">
              Your premier destination for verified healthcare solutions.
              We bridge the gap between quality medicine and convenience,
              delivering wellness to your doorstep with every order.
            </p>
            <div className="flex items-center gap-4">
              <Link href="https://facebook.com/medistore" target="_blank" className="h-10 w-10 flex items-center justify-center bg-background rounded-full hover:bg-primary hover:text-white transition-all shadow-sm border border-border">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="https://twitter.com/medistore" target="_blank" className="h-10 w-10 flex items-center justify-center bg-background rounded-full hover:bg-primary hover:text-white transition-all shadow-sm border border-border">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="https://instagram.com/medistore" target="_blank" className="h-10 w-10 flex items-center justify-center bg-background rounded-full hover:bg-primary hover:text-white transition-all shadow-sm border border-border">
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Links Columns */}
          <div className="space-y-6">
            <h4 className="font-bold text-lg text-foreground">Categories</h4>
            <ul className="space-y-4">
              {footerLinks.shop.map((link) => (
                <li key={link.title}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary hover:translate-x-1 inline-block transition-all">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="font-bold text-lg text-foreground">Company</h4>
            <ul className="space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.title}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary hover:translate-x-1 inline-block transition-all">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="font-bold text-lg text-foreground">Newsletter</h4>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Join our newsletter for the latest health news and exclusive discounts.
              </p>
              <div className="relative group">
                <Input
                  placeholder="Your email address"
                  className="bg-background border-border focus-visible:ring-primary/20 h-12 pr-12 rounded-xl"
                />
                <Button size="icon" className="absolute right-1.5 top-1.5 h-9 w-9 rounded-lg transition-transform active:scale-90">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <div className="pt-4 space-y-3">
                <a href="tel:+8801234567890" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors group">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                    <Phone className="h-4 w-4" />
                  </div>
                  <span className="font-medium">+880 1234 567 890</span>
                </a>
                <a href="mailto:support@medistore.com" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors group">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                    <Mail className="h-4 w-4" />
                  </div>
                  <span className="font-medium">support@medistore.com</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary/5 pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} <span className="text-primary font-bold">MediStore Healthcare Ltd.</span> All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-6">
            <Link href="/privacy" className="text-xs font-medium text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-xs font-medium text-muted-foreground hover:text-primary transition-colors">Terms of Use</Link>
            <Link href="/sitemap" className="text-xs font-medium text-muted-foreground hover:text-primary transition-colors">Cookie Policy</Link>
            <div className="flex gap-2 items-center px-4 border-l border-border h-4">
              <div className="h-5 w-8 bg-muted/60 rounded flex items-center justify-center text-[10px] font-bold text-muted">VISA</div>
              <div className="h-5 w-8 bg-muted/60 rounded flex items-center justify-center text-[10px] font-bold text-muted">MC</div>
              <div className="h-5 w-8 bg-muted/60 rounded flex items-center justify-center text-[10px] font-bold text-muted">BKASH</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export { Footer };
