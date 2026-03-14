"use client";

import Link from "next/link";
import { ShoppingCart, Store } from "lucide-react";
import { useCartStore } from "@/store/cart-store";

export default function Navbar() {
  const totalItems = useCartStore((state) => state.getTotalItems());

  return (
    <nav className="bg-white border-b border-blue-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-2xl font-bold text-blue-600 hover:text-blue-700 transition"
        >
          <Store className="w-7 h-7" />
          Ecommerce Store
        </Link>

        <div className="flex items-center gap-8 text-sm font-medium">
          <Link
            href="/products"
            className="text-gray-700 hover:text-blue-600 text-lg transition"
          >
            Shop
          </Link>

          <Link
            href="/cart"
            className="flex items-center gap-2 text-gray-700 hover:text-blue-600 text-lg transition relative"
          >
            Cart
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-2 bg-blue-600 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">
                {totalItems}
              </span>
            )}
            <ShoppingCart className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </nav>
  );
}
