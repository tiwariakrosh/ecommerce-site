"use client";

import { useState, useMemo, useEffect, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/product-card";
import Pagination from "@/components/pagination";
import { Product } from "@/lib/types";

function ClientProductsWrapper({
  initialProducts,
  initialSort,
}: {
  initialProducts: Product[];
  initialSort: string;
}) {
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 6;

  const searchTerm = searchParams.get("search")?.toLowerCase() || "";
  const selectedCategory = searchParams.get("category") || "All";
  const minPrice = parseFloat(searchParams.get("minPrice") || "0");
  const maxPrice = parseFloat(searchParams.get("maxPrice") || "9999");

  const filteredProducts = useMemo(() => {
    return initialProducts.filter((product) => {
      const matchesSearch =
        !searchTerm || product.title.toLowerCase().includes(searchTerm);

      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;

      const matchesPrice =
        product.price >= minPrice && product.price <= maxPrice;

      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [initialProducts, searchTerm, selectedCategory, minPrice, maxPrice]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  useEffect(() => {
    startTransition(() => {
      setCurrentPage(1);
    });
  }, [searchTerm, selectedCategory, minPrice, maxPrice]);

  return (
    <>
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 bg-blue-50 border border-blue-100 rounded-3xl shadow-sm">
          <p className="text-2xl text-blue-600 font-medium">
            No products match your filters
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {paginatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-12">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </>
      )}
    </>
  );
}

export default ClientProductsWrapper;
