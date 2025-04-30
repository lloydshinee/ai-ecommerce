"use client";

import { useProducts } from "@/providers/ProductsProvider";
import { motion } from "motion/react";

export function CategoryFilter() {
  const { categories, selectedCategory, setSelectedCategory } = useProducts();

  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold mb-4">Categories</h2>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <motion.button
            key={category}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-2 rounded-full ${
              selectedCategory === category
                ? "bg-indigo-600 text-white"
                : "bg-white text-indigo-600 border border-indigo-600"
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
