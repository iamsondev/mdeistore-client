import { customerService } from "@/services/customer.service";
import { sellerService } from "@/services/seller.service";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HeroCarousel } from "@/components/layout/HeroCarousel";
import { HowItWorks } from "@/components/layout/HowItWorks";
import { WhyChooseUs } from "@/components/layout/WhyChooseUs";
import { FaFacebook, FaGithub, FaXTwitter, FaLinkedin } from "react-icons/fa6";
import { Footer } from "@/components/layout/Footer";

export default async function Home() {
  const { data: categoryData } = await customerService.getCategories();
  const categories = categoryData?.data || [];

  const { data: medicineData } = await sellerService.getSellerMedicine(
    undefined,
    { cache: "no-store" },
  );
  const medicines = medicineData?.data?.slice(0, 6) || [];

  return (
    <div className="min-h-screen">
      <section>
        <HeroCarousel />
      </section>

      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-8 text-center">
          Browse by Category
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((cat: any) => (
            <Link
              key={cat.id}
              href={`/shop?categoryId=${cat.id}`}
              className="border rounded-xl p-4 text-center hover:bg-primary/5 hover:border-primary transition-all"
            >
              <p className="font-medium">{cat.name}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-8 text-center">
          Featured Medicines
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {medicines.map((medicine: any) => (
            <Link
              key={medicine.id}
              href={`/shop/${medicine.id}`}
              className="border rounded-xl overflow-hidden hover:shadow-md transition-all"
            >
              <img
                src={medicine.image || "https://placehold.co/400x300"}
                alt={medicine.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold">{medicine.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {medicine.manufacturer}
                </p>
                <p className="text-primary font-bold mt-2">৳{medicine.price}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-8">
          <Button asChild variant="outline" size="lg">
            <Link href="/shop">View All Medicines</Link>
          </Button>
        </div>
      </section>
      <section>
        <HowItWorks />
      </section>

      <section>
        <WhyChooseUs />
      </section>

      <footer className="border-t bg-muted/20 py-12 px-6">
        <Footer />
      </footer>
    </div>
  );
}
