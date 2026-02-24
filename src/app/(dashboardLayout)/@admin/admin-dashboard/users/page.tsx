import { adminService } from "@/services/admin.service";
import { UsersTable } from "@/components/modules/admin/UsersTable";

export const dynamic = "force-dynamic";

export default async function UsersPage() {
  const { data } = await adminService.getAllUsers();
  const users = data?.data || [];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Customer Management</h1>
      <UsersTable users={users} />
    </div>
  );
}
