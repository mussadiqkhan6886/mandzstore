"use client";
import { createContext, useState, useEffect, ReactNode } from "react";

export interface CartItem {
  id: string;           // MongoDB _id (string, not number)
  variantId: string;    // variant._id — unique key per variant
  name: string;
  price: number;
  onSale: boolean;
  newPrice: number | null;
  quantity: number;
  images: string[];
  selectedColor: string; // holds variant title
  stock: number;
}

export interface CartContextType {
  cart: CartItem[];
  totalAmount: number;
  totalItems: number;
  addToCart: (item: CartItem) => void;
  removeFromCart: (variantId: string) => void;
  clearCart: () => void;
  updateQuantity: (variantId: string, quantity: number) => void;
}

export const CartContext = createContext<CartContextType | null>(null);

export const CartContextProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const amount = cart.reduce(
      (sum, item) =>
        item.onSale
          ? sum + item.newPrice! * item.quantity
          : sum + item.price * item.quantity,
      0
    );
    const items = cart.reduce((sum, item) => sum + item.quantity, 0);
    setTotalAmount(amount);
    setTotalItems(items);
  }, [cart]);

  const addToCart = (newItem: CartItem) => {
    setCart((prev) => {
      // Match on variantId — each variant is its own cart line
      const existing = prev.find((item) => item.variantId === newItem.variantId);

      if (existing) {
        return prev.map((item) =>
          item.variantId === newItem.variantId
            ? { ...item, quantity: Math.min(item.quantity + newItem.quantity, item.stock) }
            : item
        );
      }

      return [...prev, { ...newItem, quantity: Math.min(newItem.quantity, newItem.stock) }];
    });
  };

  // All operations now keyed on variantId, not id
  const removeFromCart = (variantId: string) =>
    setCart((prev) => prev.filter((item) => item.variantId !== variantId));

  const updateQuantity = (variantId: string, quantity: number) =>
    setCart((prev) =>
      prev.map((item) =>
        item.variantId === variantId
          ? { ...item, quantity: Math.min(Math.max(1, quantity), item.stock) }
          : item
      )
    );

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{ cart, totalAmount, totalItems, addToCart, removeFromCart, clearCart, updateQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};