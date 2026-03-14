"use client";

import { useCartStore } from "@/store/cart-store";
import Image from "next/image";
import Link from "next/link";
import { Trash2 } from "lucide-react";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, getTotalPrice, clearCart } =
    useCartStore();

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-24 text-center">
        <h2 className="text-4xl font-light mb-4">Your cart is empty</h2>

        <Link href="/products">
          <button className="mt-6 bg-blue-600 text-white py-3 px-6 rounded-full hover:bg-blue-700 transition shadow-md">
            Browse products
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold">Shopping Cart</h1>

        <button
          onClick={clearCart}
          className="text-blue-600 text-sm hover:text-blue-800 flex items-center gap-2"
        >
          <Trash2 className="w-4 h-4" /> Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-8">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex gap-8 border-b border-blue-100 py-8 last:border-none"
            >
              <div className="w-32 h-32 bg-blue-50 rounded-2xl overflow-hidden flex-shrink-0">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={128}
                  height={128}
                  className="object-contain"
                />
              </div>

              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-1">{item.title}</h3>

                <p className="text-sm text-gray-500 mb-4">
                  ${item.price.toFixed(2)}
                </p>

                <div className="flex items-center gap-6">
                  <div className="flex border border-blue-200 rounded-xl overflow-hidden">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-4 py-2 hover:bg-blue-50 transition"
                    >
                      -
                    </button>

                    <div className="px-6 py-2 font-medium">{item.quantity}</div>

                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-4 py-2 hover:bg-blue-50 transition"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-blue-500 hover:text-blue-700 text-sm"
                  >
                    Remove
                  </button>
                </div>
              </div>

              <div className="text-right font-semibold text-xl text-blue-700">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        <div className="col-span-12 lg:col-span-4">
          <div className="bg-blue-50 border border-blue-100 rounded-3xl p-8 sticky top-24 shadow-sm">
            <h3 className="font-semibold text-xl mb-6">Order Summary</h3>

            <div className="flex justify-between py-4 border-b border-blue-100">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-semibold">
                ${getTotalPrice().toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between py-4 text-xl font-bold border-b border-blue-100">
              <span>Total</span>
              <span className="text-blue-700">
                ${getTotalPrice().toFixed(2)}
              </span>
            </div>

            <button className="mt-8 w-full bg-blue-600 text-white py-3 px-6 rounded-full text-lg font-semibold hover:bg-blue-700 transition shadow-md">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
