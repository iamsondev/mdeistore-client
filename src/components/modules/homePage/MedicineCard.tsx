import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Medicine } from "@/types/medicine.type";
import { ShoppingCart, Eye } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function MedicineCard({ medicine }: { medicine: Medicine }) {
  return (
    <Card className="h-full overflow-hidden border-none shadow-md transition-all duration-300 hover:shadow-xl group flex flex-col">
      <div className="relative h-48 w-full overflow-hidden bg-muted">
        {medicine.image ? (
          <Image
            src={medicine.image}
            alt={medicine.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-4xl font-bold text-muted-foreground">
            💊
          </div>
        )}

        <Badge className="absolute right-2 top-2 bg-blue-600/90 hover:bg-blue-600">
          {typeof medicine.category === "object"
            ? medicine.category?.name || "Medicine"
            : medicine.category}
        </Badge>
      </div>

      <CardHeader className="p-4 flex-grow">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="line-clamp-1 text-lg font-bold text-gray-800">
              {medicine.name}
            </CardTitle>
            <p className="text-xs text-muted-foreground font-medium uppercase">
              {medicine.manufacturer}
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4 pt-0">
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-green-600">
              ৳{medicine.price}
            </span>
          </div>

          <span
            className={`text-xs font-semibold ${medicine.stock > 0 ? "text-gray-400" : "text-red-500"}`}
          >
            {medicine.stock > 0 ? `In Stock` : "Out of Stock"}
          </span>
        </div>
      </CardContent>

      <CardFooter className="p-4 border-t bg-gray-50/50 gap-2">
        <Link href={`/shop/${medicine.id}`} className="flex-1">
          <Button className="w-full flex items-center justify-center gap-2 border border-zinc-300 py-2 rounded-lg text-sm font-medium hover:bg-white transition-colors">
            <Eye className="h-4 w-4" /> Details
          </Button>
        </Link>

        <Button
          disabled={medicine.stock === 0}
          className="flex-[1.5] flex items-center justify-center gap-2 bg-zinc-900 text-white py-2 rounded-lg text-sm font-medium hover:bg-zinc-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          <ShoppingCart className="h-4 w-4" /> Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
