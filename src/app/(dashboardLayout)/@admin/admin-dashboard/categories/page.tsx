import { adminService } from "@/services/admin.service";
import { CategoriesTable } from "@/components/modules/admin/CategoriesTable";

export const dynamic = "force-dynamic";

export default async function CategoriesPage() {
  const { data } = await adminService.getCategories();

  const categories = data?.data || [];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Category Management</h1>
      <CategoriesTable categories={categories} />
    </div>
  );
}
