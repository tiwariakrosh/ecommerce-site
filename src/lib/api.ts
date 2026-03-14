import { Product } from "./types";

const BASE_URL = "https://fakestoreapi.com";

export const apiFetch = async <T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> => {
  const url = `${BASE_URL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;

  try {
    const response = await fetch(url, {
      ...options,
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `API Error ${response.status}: ${errorText || response.statusText}`,
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("API request failed:", error);
    throw new Error(
      error instanceof Error
        ? `Failed to fetch data: ${error.message}`
        : "An unexpected error while connecting to the API.",
    );
  }
};

// Specific API functions
export const getAllProducts = async (
  sort?: "asc" | "desc",
): Promise<Product[]> => {
  const query = sort ? `?sort=${sort}` : "";
  return apiFetch<Product[]>(`/products${query}`);
};

export const getProductById = async (id: string): Promise<Product> => {
  return apiFetch<Product>(`/products/${id}`);
};

export const getAllCategories = async (): Promise<string[]> => {
  return apiFetch<string[]>("/products/categories");
};
