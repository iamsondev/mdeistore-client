import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/navbar";
import { HealthBot } from "@/components/modules/ai/HealthBot";

export default function commonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <HealthBot />
    </div>
  );
}
