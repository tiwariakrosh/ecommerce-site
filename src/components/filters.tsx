"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  categories: string[];
}

export default function Filters({ categories }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [category, setCategory] = useState(
    searchParams.get("category") || "All",
  );
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");
  const [sort, setSort] = useState(searchParams.get("sort") || "desc");

  const updateURL = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value && value !== "All") {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSearch(searchParams.get("search") || "");
    setCategory(searchParams.get("category") || "All");
    setMinPrice(searchParams.get("minPrice") || "");
    setMaxPrice(searchParams.get("maxPrice") || "");
    setSort(searchParams.get("sort") || "desc");
  }, [searchParams]);

  return (
    <div className="bg-blue-50 border border-blue-100 p-6 rounded-3xl space-y-6 shadow-sm">
      <div>
        <label className="text-sm font-medium mb-2 block text-blue-700">
          Search Products
        </label>

        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            updateURL("search", e.target.value);
          }}
          placeholder="Search by name..."
          className="w-full px-4 py-3 border border-blue-200 rounded-xl 
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="text-sm font-medium mb-2 block text-blue-700">
          Category
        </label>

        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            updateURL("category", e.target.value);
          }}
          className="w-full px-4 py-3 border border-blue-200 rounded-xl 
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="All">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-sm font-medium mb-3 block text-blue-700">
          Price Range
        </label>

        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => {
              setMinPrice(e.target.value);
              updateURL("minPrice", e.target.value);
            }}
            className="w-full px-4 py-3 border border-blue-200 rounded-xl 
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => {
              setMaxPrice(e.target.value);
              updateURL("maxPrice", e.target.value);
            }}
            className="w-full px-4 py-3 border border-blue-200 rounded-xl 
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium mb-2 block text-blue-700">
          Sort By Price
        </label>

        <select
          value={sort}
          onChange={(e) => {
            setSort(e.target.value);
            updateURL("sort", e.target.value);
          }}
          className="w-full px-4 py-3 border border-blue-200 rounded-xl 
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="desc">High to Low</option>
          <option value="asc">Low to High</option>
        </select>
      </div>
    </div>
  );
}
