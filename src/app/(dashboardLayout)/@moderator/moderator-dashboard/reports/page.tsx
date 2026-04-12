import { adminService } from "@/services/admin.service";
import { sellerService } from "@/services/seller.service";
import { Flag, AlertTriangle, CheckCircle, MessageSquare, Package } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function ModeratorReportsPage() {
  const [reviewsRes, medicinesRes] = await Promise.all([
    adminService.getAllReviews(),
    sellerService.getSellerMedicine({ limit: "50" }),
  ]);

  const reviews = reviewsRes?.data?.data || [];
  const medicines = medicinesRes?.data?.data || [];

  // Generate dynamic reports from real data
  const reviewReports = reviews
    .filter((r: any) => r.rating <= 2)
    .map((r: any) => ({
      id: `rev-${r.id}`,
      reporter: r.user?.name || "Anonymous",
      type: "Low Rating / Review Issue",
      target: `Review on ${r.medicine?.name || "Product"}`,
      reason: r.comment,
      status: "OPEN",
      date: new Date().toLocaleDateString(),
      icon: MessageSquare,
      color: "bg-orange-100 text-orange-700",
    }));

  const productReports = medicines
    .filter((m: any) => !m.image || !m.description || Number(m.price) < 1)
    .map((m: any) => ({
      id: `prod-${m.id}`,
      reporter: "System Auto-Flag",
      type: "Product Integrity",
      target: m.name,
      reason: !m.image ? "Missing Image" : !m.description ? "Missing Description" : "Suspicious Price",
      status: "OPEN",
      date: new Date().toLocaleDateString(),
      icon: Package,
      color: "bg-red-100 text-red-700",
    }));

  const reports = [...reviewReports, ...productReports];
  const openReports = reports.length;

  return (
    <div className="space-y-6 p-2">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Flag className="h-6 w-6 text-rose-500" />
          Data-Driven Reports
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Showing issues flagged from backend reviews and products
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-2xl border border-rose-200 bg-rose-50 dark:bg-rose-950 p-5 text-center">
           <p className="text-3xl font-black text-rose-700">{reviewReports.length}</p>
           <p className="text-sm text-rose-600">Review Issues</p>
        </div>
        <div className="rounded-2xl border border-amber-200 bg-amber-50 dark:bg-amber-950 p-5 text-center">
           <p className="text-3xl font-black text-amber-700">{productReports.length}</p>
           <p className="text-sm text-amber-600">Product Integrity</p>
        </div>
      </div>

      <div className="space-y-4">
        {reports.map((report) => (
          <div
            key={report.id}
            className="rounded-2xl border border-border bg-card p-5 flex flex-col gap-3"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div
                  className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${report.color}`}
                >
                  {report.type}
                </div>
              </div>
              <span className="text-xs text-muted-foreground">{report.date}</span>
            </div>

            <div>
              <p className="font-semibold text-sm">
                Target: <span className="font-bold text-primary">{report.target}</span>
              </p>
              <p className="text-sm text-muted-foreground mt-1 italic">
                "{report.reason}"
              </p>
              <p className="text-[10px] text-muted-foreground mt-2">Source: {report.reporter}</p>
            </div>

            <div className="flex gap-3 mt-1">
                <button className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl bg-emerald-100 text-emerald-700 hover:bg-emerald-200 transition">
                  <CheckCircle className="h-3.5 w-3.5" />
                  Acceptable
                </button>
                <button className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl bg-red-100 text-red-700 hover:bg-red-200 transition">
                  <Flag className="h-3.5 w-3.5" />
                  Remove Item
                </button>
            </div>
          </div>
        ))}
        {reports.length === 0 && (
          <div className="text-center py-20 text-muted-foreground bg-muted/20 rounded-3xl border border-dashed">
             No issues currently flagged from backend data.
          </div>
        )}
      </div>
    </div>
  );
}

