import { AppSidebar } from "@/components/layout/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ModeToggle } from "@/components/layout/ModeToggle";
import { customerService } from "@/services/customer.service";

export default async function DashboardLayout({
  admin,
  seller,
  customer,
  moderator,
  deliveryAgent,
}: {
  children: React.ReactNode;
  admin: React.ReactNode;
  seller: React.ReactNode;
  customer: React.ReactNode;
  moderator: React.ReactNode;
  deliveryAgent: React.ReactNode;
}) {
  const { data: session } = await customerService.getsession();
  const role = session?.user?.role;
  
  console.log("Current user role in layout:", role);



  const roleLabels: Record<string, string> = {
    ADMIN: "👑 Admin",
    SELLER: "🏪 Seller",
    CUSTOMER: "🛍️ Customer",
    MODERATOR: "🛡️ Moderator",
    DELIVERY_AGENT: "🚴 Delivery Agent",
  };

  return (
    <SidebarProvider>
      <AppSidebar customer={{ role: role || "" }} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>{roleLabels[role] || role}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="ml-auto">
            {" "}
            <ModeToggle />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          {role === "ADMIN" && admin}
          {role === "SELLER" && seller}
          {role === "CUSTOMER" && customer}
          {role === "MODERATOR" && moderator}
          {role === "DELIVERY_AGENT" && deliveryAgent}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
