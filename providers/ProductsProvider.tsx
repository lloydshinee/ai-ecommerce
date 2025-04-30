"use client";

import { Product } from "@/lib/products";
import { products as ps } from "@/lib/products";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface ProductsContextType {
  products: Product[];
  categories: string[];
  setSearchTerm: (term: string) => void;
  setSelectedCategory: (category: string) => void;
  searchTerm: string;
  selectedCategory: string;
}

const ProductsContext = createContext<ProductsContextType | undefined>(
  undefined
);

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    ...Array.from(new Set(data.map((product) => product.category))),
  ];

  const products = data.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "" ||
      selectedCategory === "All" ||
      product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  useEffect(() => {
    const fetchProducts = async () => {
      setData(ps);
    };

    fetchProducts();
  }, []);

  const value = {
    products,
    categories,
    setSearchTerm,
    setSelectedCategory,
    searchTerm,
    selectedCategory,
  };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductsContext);
  if (context === undefined) {
    throw new Error("useProducts must be used within a ProductsProvider");
  }
  return context;
}
