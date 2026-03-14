import { getAllProducts, getAllCategories } from "@/lib/api";
import Filters from "@/components/filters";
import { Product } from "@/lib/types";
import ClientProductsWrapper from "@/components/product-wrapper";

interface Props {
  searchParams: { [key: string]: string | undefined };
}

export default async function ProductsPage({ searchParams }: Props) {
  const sort = (searchParams.sort as "asc" | "desc" | undefined) || "desc";

  let products: Product[] = [];
  let categories: string[] = [];

  try {
    [products, categories] = await Promise.all([
      getAllProducts(sort),
      getAllCategories(),
    ]);
  } catch {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <div className="bg-blue-50 border border-blue-100 rounded-3xl p-10 shadow-sm">
          <h2 className="text-2xl font-semibold text-blue-700">
            Failed to load products
          </h2>
          <p className="text-gray-600 mt-2">Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-10 gap-4">
        <h1 className="text-4xl font-bold text-gray-900">All Products</h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        <div className="lg:w-80 shrink-0">
          <div className="bg-blue-50 border border-blue-100 rounded-3xl p-6 shadow-sm">
            <Filters categories={categories} />
          </div>
        </div>
        <div className="flex-1">
          <ClientProductsWrapper
            initialProducts={products}
            initialSort={sort}
          />
        </div>
      </div>
    </div>
  );
}
