"use client";

import { useState } from "react";
import { useCartStore } from "@/store/cart-store";
import { Product } from "@/lib/types";
import { ShoppingCart } from "lucide-react";

interface Props {
  product: Product;
}

export default function AddToCartButton({ product }: Props) {
  const [quantity, setQuantity] = useState(1);
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAdd = () => {
    addToCart(product, quantity);
    alert(`${quantity} × ${product.title} added to cart!`);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-6 items-stretch">
      <div>
        <label className="text-sm font-medium text-blue-600 block mb-2">
          Quantity
        </label>

        <div className="flex border border-blue-200 rounded-2xl overflow-hidden bg-white">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-5 py-3 text-xl font-light hover:bg-blue-50 transition"
          >
            −
          </button>

          <div className="px-8 py-3 text-lg font-semibold border-x border-blue-200">
            {quantity}
          </div>

          <button
            onClick={() => setQuantity(quantity + 1)}
            className="px-5 py-3 text-xl font-light hover:bg-blue-50 transition"
          >
            +
          </button>
        </div>
      </div>

      <button
        onClick={handleAdd}
        className="flex-1 mt-6 bg-blue-600 hover:bg-blue-700 
                   text-white h-14 rounded-2xl outline-0 font-semibold flex items-center justify-center gap-3 transition text-lg"
      >
        <ShoppingCart className="w-5 h-5" />
        Add to Cart
      </button>
    </div>
  );
}
