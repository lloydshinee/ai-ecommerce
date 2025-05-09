"use client";

import { CartItem, Product } from "@/lib/products";
import { createContext, useContext, useState } from "react";

interface CartContextType {
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
  addToCart: (item: Product, quantity?: number) => void;
  removeFromCart: (productName: string) => void;
  updateCartItemQuantity: (productName: string, quantity: number) => void;
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

  const addToCart = (product: Product, quantity?: number) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.product.name === product.name
      );

      if (existingIndex !== -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingIndex].quantity += quantity || 1;
        return updatedCart;
      } else {
        return [...prevCart, { product, quantity: quantity || 1 }];
      }
    });
  };

  const removeFromCart = (productName: string) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.product.name !== productName)
    );
  };

  const updateCartItemQuantity = (productName: string, quantity: number) => {
    setCart((prevCart) => {
      if (quantity <= 0) {
        return prevCart.filter((item) => item.product.name !== productName);
      } else {
        return prevCart.map((item) =>
          item.product.name === productName ? { ...item, quantity } : item
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
