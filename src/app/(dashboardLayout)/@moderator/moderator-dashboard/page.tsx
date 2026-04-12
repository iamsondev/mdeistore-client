import { customerService } from "@/services/customer.service";
import ModeratorDashboard from "@/components/modules/moderator/ModeratorDashboard";
import { adminService } from "@/services/admin.service";

export const dynamic = "force-dynamic";

export default async function ModeratorDashboardPage() {
  const { data: sessionData } = await customerService.getsession();
  const userName = sessionData?.user?.name;

  // Fetch real data for stats and activity
  const [reviewsRes, statsRes, sellersRes] = await Promise.all([
    adminService.getAllReviews(),
    adminService.getStatistics(),
    adminService.getAllSellers(),
  ]);

  const reviews = reviewsRes?.data?.data || [];
  const stats = statsRes?.data?.data || {};
  const sellers = sellersRes?.data?.data || [];

  const dashboardData = {
    pendingReviews: reviews.length,
    totalProducts: stats.totalMedicines || 0,
    pendingSellers: sellers.filter((s: any) => s.status === "PENDING").length,
    recentReviews: reviews.slice(0, 5),
  };

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <ModeratorDashboard 
        userName={userName} 
        stats={dashboardData}
      />
    </div>
  );
}

