import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { Product } from "@/lib/types";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  return (
    <div className="product-card bg-white border border-blue-100 rounded-3xl overflow-hidden flex flex-col h-full shadow-sm hover:shadow-md transition">
      <div className="relative h-64 bg-blue-50">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-contain p-8"
        />
      </div>
      <div className="p-6 flex flex-col flex-1">
        <div className="text-xs uppercase tracking-widest text-blue-600 font-medium mb-1">
          {product.category}
        </div>
        <Link
          href={`/products/${product.id}`}
          className="font-semibold line-clamp-2 hover:text-blue-600 transition"
        >
          {product.title}
        </Link>
        <div className="mt-auto pt-6">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-blue-700">
              ${product.price}
            </span>

            <div className="flex items-center gap-1 text-amber-400">
              <Star className="w-4 h-4 fill-current" />
              <span className="text-sm text-gray-600">
                {product.rating.rate}
              </span>
              <span className="text-xs text-gray-400">
                ({product.rating.count})
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
