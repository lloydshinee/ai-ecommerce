"use client";

import { useCart } from "@/providers/CartProvider";
import { useProducts } from "@/providers/ProductsProvider";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

export function ShopHeader() {
  const { searchTerm, setSearchTerm } = useProducts();
  const {
    setIsCartOpen,
    isCartOpen,
    cart,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
  } = useCart();

  return (
    <header className="bg-white shadow md:sticky md:top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center"
        >
          <h1 className="text-2xl font-bold text-indigo-600">ShopEase</h1>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <Search
              className="absolute right-3 top-2.5 text-gray-400"
              size={18}
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative p-2"
            onClick={() => setIsCartOpen(!isCartOpen)}
          >
            <ShoppingBag className="text-indigo-600" size={24} />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </motion.button>
        </div>

        <div className="md:hidden">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <AnimatePresence mode="wait" initial={false}>
              {isMobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="text-indigo-600" size={24} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="text-indigo-600" size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-200"
          >
            <div className="p-4 space-y-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <Search
                  className="absolute right-3 top-2.5 text-gray-400"
                  size={18}
                />
              </div>

              <button
                className="flex items-center space-x-2 text-indigo-600"
                onClick={() => {
                  setIsCartOpen(!isCartOpen);
                  setIsMobileMenuOpen(false);
                }}
              >
                <ShoppingBag size={20} />
                <span>Cart ({cart.length})</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
