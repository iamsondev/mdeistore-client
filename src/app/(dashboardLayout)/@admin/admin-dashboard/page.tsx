import { adminService } from "@/services/admin.service";
import { 
  Users, 
  ShoppingBag, 
  Package, 
  TrendingUp, 
  Store, 
  Truck, 
  ArrowUpRight,
  ShieldCheck,
  Activity
} from "lucide-react";
import { customerService } from "@/services/customer.service";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const { data: sessionData } = await customerService.getsession();
  const { data: statsData } = await adminService.getStatistics();

  const userName = sessionData?.user?.name;
  const stats = statsData?.data;

  const totalUsers = stats?.totalUsers || 0;
  const totalSellers = stats?.totalSellers || 0;
  const totalAgents = stats?.totalAgents || 0;
  const totalOrders = stats?.totalOrders || 0;
  const totalMedicines = stats?.totalMedicines || 0;
  const totalRevenue = stats?.totalRevenue || 0;

  const primaryStats = [
    { 
      label: "Total Revenue", 
      value: `৳${totalRevenue.toLocaleString()}`, 
      icon: TrendingUp, 
      color: "from-emerald-500 to-teal-600",
      description: "Lifetime earnings (Paid)"
    },
    { 
      label: "Total Orders", 
      value: totalOrders, 
      icon: ShoppingBag, 
      color: "from-indigo-500 to-blue-600",
      description: "Order requests processed"
    },
    { 
      label: "Medicines", 
      value: totalMedicines, 
      icon: Package, 
      color: "from-rose-500 to-pink-600",
      description: "Inventory items"
    },
    { 
      label: "Customers", 
      value: totalUsers, 
      icon: Users, 
      color: "from-amber-500 to-orange-600",
      description: "Active platform users"
    },
  ];

  return (
    <div className="space-y-10 p-4">
      {/* ── Header Section ── */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-zinc-900 p-8 md:p-12 text-white shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-black tracking-tighter sm:text-5xl">
              Greetings, {userName}! <ShieldCheck className="inline h-10 w-10 text-emerald-400 align-middle" />
            </h1>
            <p className="text-zinc-400 font-medium text-lg leading-relaxed max-w-md">
              Your platform overview is ready. Here&apos;s a summary of the current ecosystem status.
            </p>
          </div>
          <div className="flex gap-4">
             <div className="bg-zinc-800/50 backdrop-blur-md rounded-3xl p-6 border border-zinc-700/50">
                <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-1">Status</p>
                <div className="flex items-center gap-2">
                   <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                   <span className="font-bold text-sm">System Online</span>
                </div>
             </div>
          </div>
        </div>
        
        {/* Decorative background circle */}
        <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />
      </div>

      {/* ── Main Stats Grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {primaryStats.map((stat) => (
          <div 
            key={stat.label}
            className="group relative overflow-hidden rounded-[2rem] border border-border/50 bg-card p-8 shadow-xl shadow-black/5 hover:shadow-primary/5 transition-all duration-500"
          >
            <div className="relative z-10 flex flex-col h-full justify-between gap-6">
              <div className="flex items-center justify-between">
                <div className={cn("rounded-2xl bg-gradient-to-br p-3.5 shadow-lg", stat.color)}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className="bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 px-3 py-1.5 rounded-full text-[10px] font-black flex items-center gap-1 uppercase tracking-widest">
                   Live <Activity className="h-3 w-3" />
                </div>
              </div>
              
              <div>
                <h2 className="text-4xl font-black tracking-tighter text-zinc-900 dark:text-white mb-1">
                  {stat.value}
                </h2>
                <p className="text-sm font-bold text-zinc-500 uppercase tracking-widest">
                  {stat.label}
                </p>
              </div>

              <div className="pt-4 border-t border-border/40 flex items-center justify-between">
                 <span className="text-[10px] font-bold text-muted-foreground italic">{stat.description}</span>
                 <ArrowUpRight className="h-4 w-4 text-zinc-300 group-hover:text-primary transition-colors" />
              </div>
            </div>
            
            {/* Hover overlay bit */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-zinc-50/50 dark:to-zinc-900/50 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        ))}
      </div>

      {/* ── Secondary Logistics Section ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <div className="rounded-[2.5rem] bg-gradient-to-br from-zinc-50 to-white dark:from-zinc-900 dark:to-zinc-950 border border-border/50 p-8 shadow-2xl">
            <h3 className="text-lg font-black uppercase tracking-[0.2em] mb-8 flex items-center gap-3">
               <Truck className="h-5 w-5 text-indigo-500" /> Logistics Support
            </h3>
            
            <div className="grid grid-cols-2 gap-6">
               <div className="bg-white dark:bg-zinc-800 p-6 rounded-3xl border border-border/40 shadow-sm">
                  <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-2">Delivery Agents</p>
                  <p className="text-4xl font-black">{totalAgents}</p>
                  <div className="mt-4 flex items-center gap-2 text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded-lg w-fit">
                     <Users className="h-3 w-3" /> Active Fleet
                  </div>
               </div>
               
               <div className="bg-white dark:bg-zinc-800 p-6 rounded-3xl border border-border/40 shadow-sm">
                  <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-2">Store Partners</p>
                  <p className="text-4xl font-black">{totalSellers}</p>
                  <div className="mt-4 flex items-center gap-2 text-[10px] font-bold text-blue-600 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded-lg w-fit">
                     <Store className="h-3 w-3" /> Registered
                  </div>
               </div>
            </div>
         </div>

         <div className="rounded-[2.5rem] bg-indigo-600 p-10 text-white flex flex-col justify-between shadow-2xl relative overflow-hidden group">
            <div className="relative z-10">
               <h3 className="text-3xl font-black tracking-tighter mb-4">Daily Performance insights</h3>
               <p className="text-indigo-100 text-lg leading-relaxed max-w-sm opacity-80 font-medium">
                  The platform activity has increased by <span className="text-white font-black underline decoration-indigo-300 underline-offset-4">12%</span> compared to last week.
               </p>
            </div>
            
            <button className="relative z-10 mt-8 bg-white text-indigo-600 h-14 w-full rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-indigo-50 transition-all active:scale-95 shadow-xl shadow-black/10">
               Generate Detailed Report
            </button>

            {/* Decorative background icons */}
            <Activity className="absolute -bottom-10 -right-10 h-64 w-64 text-white/5 group-hover:rotate-12 transition-transform duration-700" />
         </div>
      </div>
    </div>
  );
}
