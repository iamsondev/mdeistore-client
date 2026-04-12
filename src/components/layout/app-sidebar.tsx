"use client";

import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarHeader,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { adminRoutes } from "@/routes/adminRoutes";
import { sellerRoutes } from "@/routes/sellerRoutes";
import { customerRoutes } from "@/routes/customerRoutes";
import { moderatorRoutes } from "@/routes/moderatorRoutes";
import { deliveryAgentRoutes } from "@/routes/deliveryAgentRoutes";
import { Route } from "@/types";
import { Roles } from "@/constants/roles";
import { Pill, ShieldCheck, User, Store, Truck, ShieldAlert, ChevronRight, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { SidebarFooter } from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

export function AppSidebar({
  customer,
  ...props
}: {
  customer: { role: string };
} & React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    const toastId = toast.loading("Logging out...");
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success("Logged out successfully", { id: toastId });
            router.push("/");
            router.refresh();
          },
        },
      });
    } catch (err) {
      toast.error("Logout failed", { id: toastId });
    }
  };

  let routes: Route[] = [];
  
  const roleInfo = {
    [Roles.admin]: { label: "Administrator", icon: ShieldCheck, color: "text-rose-500 bg-rose-500/10 border-rose-500/20" },
    [Roles.seller]: { label: "Store Partner", icon: Store, color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20" },
    [Roles.moderator]: { label: "Guardian", icon: ShieldAlert, color: "text-amber-500 bg-amber-500/10 border-amber-500/20" },
    [Roles.deliveryBoy]: { label: "Logistics", icon: Truck, color: "text-blue-500 bg-blue-500/10 border-blue-500/20" },
    [Roles.customer]: { label: "Valued User", icon: User, color: "text-primary bg-primary/10 border-primary/20" },
  };

  const currentRole = roleInfo[customer?.role] || { label: "Guest", icon: User, color: "text-muted-foreground bg-muted border-border" };

  switch (customer?.role) {
    case Roles.admin:
      routes = adminRoutes;
      break;
    case Roles.seller:
      routes = sellerRoutes;
      break;
    case Roles.customer:
      routes = customerRoutes;
      break;
    case Roles.moderator:
      routes = moderatorRoutes;
      break;
    case Roles.deliveryBoy:
      routes = deliveryAgentRoutes;
      break;
    default:
      routes = [];
      break;
  }

  return (
    <Sidebar className="border-r border-border/50 bg-card" {...props}>
      <SidebarHeader className="h-20 flex px-4 border-b border-border/40 bg-muted/20">
        <Link href="/" className="flex items-center gap-3 group transition-all">
          <motion.div 
            whileHover={{ rotate: 15 }}
            className="bg-primary p-2.5 rounded-2xl shadow-lg shadow-primary/20"
          >
            <Pill className="h-6 w-6 text-white" />
          </motion.div>
          <div className="flex flex-col">
            <span className="text-xl font-black text-primary tracking-tighter leading-none italic uppercase">
              Medistore
            </span>
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mt-1">
              Health Central
            </span>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-3 py-6 space-y-8">
        {/* Role Identity Card */}
        <div className={cn("mx-1 p-3 rounded-2xl border flex items-center gap-3 shadow-sm", currentRole.color)}>
           <currentRole.icon className="h-5 w-5 shrink-0" />
           <div className="flex flex-col overflow-hidden">
             <p className="text-[10px] uppercase font-black tracking-widest opacity-70">Access Level</p>
             <p className="text-sm font-bold truncate">{currentRole.label}</p>
           </div>
        </div>

        {routes.map((group, groupIndex) => (
          <SidebarGroup key={group.title} className="p-0">
            <SidebarGroupLabel className="px-4 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 mb-2">
              {group.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="gap-1">
                <AnimatePresence mode="popLayout">
                  {group.items?.map((item, itemIndex) => {
                    const isActive = pathname === item.url;
                    return (
                      <motion.div
                        key={item.title}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: itemIndex * 0.05 + groupIndex * 0.1 }}
                      >
                        <SidebarMenuItem>
                          <SidebarMenuButton 
                            asChild 
                            tooltip={item.title}
                            className={cn(
                              "h-11 rounded-xl px-4 transition-all duration-300",
                              isActive 
                                ? "bg-primary text-primary-foreground shadow-md shadow-primary/20 hover:bg-primary/90" 
                                : "hover:bg-primary/10 hover:text-primary group/item"
                            )}
                          >
                            <Link href={item.url} className="flex items-center gap-3">
                              {item.icon && (
                                <item.icon className={cn(
                                  "h-5 w-5 transition-transform duration-300",
                                  !isActive && "group-hover/item:scale-110"
                                )} />
                              )}
                              <span className="font-bold text-sm tracking-tight flex-1">{item.title}</span>
                              <ChevronRight className={cn(
                                "h-4 w-4 opacity-0 transition-all duration-300",
                                isActive ? "opacity-40 translate-x-0" : "group-hover/item:opacity-40 -translate-x-2"
                              )} />
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter className="p-4 border-t border-border/40 bg-muted/10">
        <motion.button
          whileHover={{ x: 5 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogout}
          className="flex items-center gap-3 w-full h-12 px-4 rounded-2xl text-rose-500 hover:bg-rose-500/10 transition-all font-black text-xs uppercase tracking-widest group"
        >
          <LogOut className="h-5 w-5 transition-transform group-hover:rotate-12" />
          <span>Exit System</span>
        </motion.button>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
