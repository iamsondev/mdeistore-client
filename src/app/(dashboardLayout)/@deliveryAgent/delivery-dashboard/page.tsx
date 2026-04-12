import { customerService } from "@/services/customer.service";
import { DeliveryDashboard } from "@/components/modules/deliveryAgent/DeliveryDashboard";
import { adminService } from "@/services/admin.service";

export const dynamic = "force-dynamic";

export default async function DeliveryDashboardPage() {
  const { data: sessionData } = await customerService.getsession();
  const userName = sessionData?.user?.name;

  // Fetch orders specifically assigned to this delivery agent
  const { data: assignmentsRes } = await adminService.getAssignedOrders();
  const assignedOrders: any[] = assignmentsRes?.data?.data || assignmentsRes?.data || [];

  const stats = {
    assignedToday: assignedOrders.filter(o => o.status === "PLACED" || o.status === "PENDING" || o.status === "SHIPPED").length,
    inTransit: assignedOrders.filter(o => o.status === "SHIPPED").length,
    deliveredToday: assignedOrders.filter(o => o.status === "DELIVERED").length,
    recentAssignments: assignedOrders.filter(o => o.status?.toUpperCase() !== "DELIVERED").slice(0, 5),
  };

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <DeliveryDashboard 
        userName={userName} 
        stats={stats}
      />
    </div>
  );
}

