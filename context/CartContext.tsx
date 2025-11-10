"use client";
import { createContext, useState, useEffect, ReactNode } from "react";

// 🧱 Define item type
export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

// 🧠 Define context type
export interface CartContextType {
  cart: CartItem[];
  totalAmount: number;
  totalItems: number;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  updateQuantity: (id: string, quantity: number) => void;
}

export const CartContext = createContext<CartContextType | null>(null);

export const CartContextProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  

  // 🧮 Recalculate totals
  useEffect(() => {
    const amount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const items = cart.reduce((sum, item) => sum + item.quantity, 0);
    setTotalAmount(amount);
    setTotalItems(items);
  }, [cart]);

  // ➕ Add item
  const addToCart = (newItem: CartItem) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === newItem.id);
      if (existing) {
        return prev.map((item) =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item
        );
      }
      return [...prev, newItem];
    });
  };

  // ❌ Remove item
  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // 🔄 Update quantity
  const updateQuantity = (id: string, quantity: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  // 🧹 Clear all
  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{
        cart,
        totalAmount,
        totalItems,
        addToCart,
        removeFromCart,
        clearCart,
        updateQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
