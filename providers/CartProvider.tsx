"use client";

import { CartItem, Product } from "@/lib/products";
import { createContext, useContext, useState } from "react";
import { uid } from "uid";

interface CartContextType {
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
  addToCart: (item: Product) => void;
  removeFromCart: (itemId: string) => void;
  updateCartItemQuantity: (itemId: string, quantity: number) => void;
}
const CartContext = createContext<CartContextType | undefined>(undefined);

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

export default function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      // Check if the product is already in the cart
      const existingItemIndex = prevCart.findIndex(
        (item) => item.product.name === product.name
      );

      if (existingItemIndex !== -1) {
        // Update quantity if product exists
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += 1;
        return updatedCart;
      } else {
        const newItem: CartItem = {
          itemId: uid(),
          product,
          quantity: 1,
        };
        return [...prevCart, newItem];
      }
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.itemId !== itemId));
  };

  const updateCartItemQuantity = (itemId: string, quantity: number) => {
    setCart((prevCart) => {
      if (quantity <= 0) {
        // Remove item from cart
        return prevCart.filter((item) => item.itemId !== itemId);
      } else {
        // Update quantity
        return prevCart.map((item) =>
          item.itemId === itemId ? { ...item, quantity } : item
        );
      }
    });
  };

  const value = {
    cart,
    isCartOpen,
    setIsCartOpen,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
