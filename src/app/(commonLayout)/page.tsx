import { customerService } from "@/services/customer.service";
import { sellerService } from "@/services/seller.service";

import { HeroCarousel } from "@/components/layout/HeroCarousel";
import { Statistics } from "@/components/layout/Statistics";
import { CategoriesSection } from "@/components/layout/CategoriesSection";
import { OfferHighlights } from "@/components/layout/OfferHighlights";
import { FeaturedMedicines } from "@/components/layout/FeaturedMedicines";
import { HowItWorks } from "@/components/layout/HowItWorks";
import { WhyChooseUs } from "@/components/layout/WhyChooseUs";
import { LatestBlogs } from "@/components/layout/LatestBlogs";
import { Testimonials } from "@/components/layout/Testimonials";
import { FAQSection } from "@/components/layout/FAQSection";
import { NewsletterSection } from "@/components/layout/NewsletterSection";

export default async function Home() {
  // Fetch all data server-side in parallel
  const [{ data: categoryData }, { data: medicineData }] = await Promise.all([
    customerService.getCategories(),
    sellerService.getSellerMedicine(undefined, { cache: "no-store" }),
  ]);

  const categories: any[] = categoryData?.data || [];
  const medicines: any[] = medicineData?.data || [];

  // Slice for each section
  const heroMedicines = medicines.slice(0, 3);   // top 3 for hero carousel
  const featuredMedicines = medicines.slice(0, 8); // top 8 for featured grid

  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      
      {/* 1. Hero / Carousel — top 3 real medicines */}
      <HeroCarousel medicines={heroMedicines} />

      {/* 2. Statistics — real counts from backend */}
      <Statistics
        medicineCount={medicines.length}
        categoryCount={categories.length}
      />

      {/* 3. Categories — real categories from backend */}
      <CategoriesSection categories={categories} />

      {/* 4. Offer Highlights — uses real medicine data for deal cards */}
      <OfferHighlights medicines={medicines} />

      {/* 5. Featured Products — real medicines */}
      <FeaturedMedicines medicines={featuredMedicines} />

      {/* 6. How It Works */}
      <HowItWorks />

      {/* 7. Why Choose Us */}
      <WhyChooseUs />

      {/* 8. Latest Blogs — static content (no blog API available on backend) */}
      <LatestBlogs />

      {/* 9. Testimonials — static content (no reviews API for homepage) */}
      <Testimonials />

      {/* 10. FAQ */}
      <FAQSection />

      {/* 11. Newsletter */}
      <NewsletterSection />

    </div>
  );
}
