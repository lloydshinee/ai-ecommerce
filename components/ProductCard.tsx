"use client";

import { Product } from "@/lib/products";
import { useCart } from "@/providers/CartProvider";
import { Star } from "lucide-react";
import { motion } from "motion/react";

export function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return (
    <motion.div
      key={product.name}
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg shadow-md overflow-hidden"
    >
      <div className="h-48 bg-gray-200 relative">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        {product.discountedPrice < product.price && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            {Math.round(
              ((product.price - product.discountedPrice) / product.price) * 100
            )}
            % OFF
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-1">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-2">{product.description}</p>

        <div className="flex gap-2 mb-2">
          {product.brand && (
            <span className="text-xs bg-gray-100 px-2 py-1 rounded">
              {product.brand}
            </span>
          )}
          {product.color && (
            <span className="text-xs bg-gray-100 px-2 py-1 rounded">
              {product.color}
            </span>
          )}
        </div>

        <div className="flex items-center mb-3">
          <div className="flex text-yellow-400">
            <Star size={16} fill="currentColor" />
            <Star size={16} fill="currentColor" />
            <Star size={16} fill="currentColor" />
            <Star size={16} fill="currentColor" />
            <Star size={16} className="text-gray-300" />
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div>
            <span className="font-bold text-lg text-indigo-600">
              ₱{product.discountedPrice}
            </span>
            {product.discountedPrice < product.price && (
              <span className="text-gray-500 line-through text-sm ml-2">
                ₱{product.price}
              </span>
            )}
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-indigo-600 text-white px-3 py-1 rounded text-sm"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
