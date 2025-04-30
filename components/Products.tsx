"use client";

import { useProducts } from "@/providers/ProductsProvider";
import { AnimatePresence } from "motion/react";
import { ProductCard } from "./ProductCard";

export function Products() {
  const { products } = useProducts();

  return (
    <section>
      {/* Product Grid */}
      <h2 className="text-2xl font-bold mb-6">Our Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <AnimatePresence>
          {products.map((product) => (
            <ProductCard product={product} key={product.name} />
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
