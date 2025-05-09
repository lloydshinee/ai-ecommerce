"use client";

import { useCart } from "@/providers/CartProvider";
import { ShoppingBag, X, Minus, Plus } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion"; // fix import path from `motion/react` to `framer-motion`

export function CartSidebar() {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateCartItemQuantity,
  } = useCart();

  const calculateTotal = () =>
    cart.reduce(
      (sum, item) => sum + item.product.discountedPrice * item.quantity,
      0
    );

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsCartOpen(false)}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-80 md:w-96 bg-white shadow-xl z-50 overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Your Cart ({cart.length})</h2>
                <button onClick={() => setIsCartOpen(false)}>
                  <X size={24} />
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingBag className="mx-auto text-gray-300" size={48} />
                  <p className="text-gray-500 mt-4">Your cart is empty</p>
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-8">
                    {cart.map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex gap-3 border-b pb-4"
                      >
                        <div className="h-16 w-16 bg-gray-200 rounded flex-shrink-0">
                          <img
                            src={item.product.imageUrl}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold">{item.product.name}</h4>
                          <p className="text-sm text-gray-500">
                            {item.product.color}
                          </p>
                          <div className="flex justify-between mt-1">
                            <span className="font-medium">
                              ${item.product.discountedPrice.toFixed(2)}
                            </span>
                            <button
                              className="text-red-500 text-sm"
                              onClick={() => removeFromCart(item.product.name)}
                            >
                              Remove
                            </button>
                          </div>

                          <div className="flex items-center gap-2 mt-2">
                            <button
                              className="p-1 border rounded disabled:opacity-50"
                              onClick={() =>
                                updateCartItemQuantity(
                                  item.product.name,
                                  item.quantity - 1
                                )
                              }
                              disabled={item.quantity <= 1}
                            >
                              <Minus size={16} />
                            </button>
                            <span className="text-sm font-medium w-6 text-center">
                              {item.quantity}
                            </span>
                            <button
                              className="p-1 border rounded"
                              onClick={() =>
                                updateCartItemQuantity(
                                  item.product.name,
                                  item.quantity + 1
                                )
                              }
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between mb-2">
                      <span>Subtotal</span>
                      <span>${calculateTotal().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between mb-6">
                      <span>Shipping</span>
                      <span>Free</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg mb-6">
                      <span>Total</span>
                      <span>${calculateTotal().toFixed(2)}</span>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-indigo-600 text-white py-3 rounded-md font-medium"
                    >
                      Checkout
                    </motion.button>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
