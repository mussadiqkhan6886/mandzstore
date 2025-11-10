'use client';

import React from 'react'
import { FiTrash, FiX } from 'react-icons/fi'
import { motion } from 'framer-motion';
import { useCart } from '@/hooks/useCart';
import Image from 'next/image';

type Props = {
  showCart: boolean;
  setShowCart: React.Dispatch<React.SetStateAction<boolean>>;
};

const CartSection = ({ showCart, setShowCart }: Props) => {
  const { cart, updateQuantity, removeFromCart, totalAmount, totalItems } = useCart();

  return (
    <aside
      className="w-full h-screen top-0 bg-black/30 absolute flex justify-end z-50"
      onClick={() => setShowCart(false)}
    >
      <motion.div
        animate={{ x: 0 }}
        initial={{ x: 400 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="bg-white w-[460px] pt-6 px-6 flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 🛒 Header */}
        <div className="flex justify-between items-center">
          <p className="font-semibold text-xl">Your Cart(Items: {totalItems})</p>
          <FiX className="cursor-pointer text-xl" onClick={() => setShowCart(false)} />
        </div>

        {/* 🧺 Cart Items */}
        <div className="text-center flex-1 overflow-y-auto mt-4">
          {cart.length <= 0 ? (
            <p className="text-gray-500">Cart Is Empty</p>
          ) : (
            <div className="flex flex-col gap-3">
              {cart.map((item, i) => (
                <div className="flex gap-4 border-b border-gray-200 pb-3" key={i}>
                  <div className="shrink-0">
                    <Image
                      src={item.images[0]}
                      alt={`${item.name} - ${item.selectedColor}`}
                      width={90}
                      height={90}
                      className="rounded-md"
                    />
                  </div>

                  <div className="flex flex-col justify-between text-left flex-1">
                    <div>
                      <p className="font-medium text-sm">
                        {item.name} <span className="text-gray-500">({item.selectedColor})</span>
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                      <p>{item.quantity}</p>
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                    </div>
                      <FiTrash
                        onClick={() => removeFromCart(item.id)}
                        className="cursor-pointer text-gray-500 hover:text-red-500"
                      />

                    <div>
                      {item.onSale ? (
                        <h4 className="text-gray-700 text-sm">
                          <span className="line-through opacity-70">Rs. {item.price}</span>{" "}
                          <span className="font-semibold text-[16px]">Rs. {item.newPrice}</span>{" "}
                          <span className="text-red-500 text-xs">
                            Save Rs. {item.price - item.newPrice!}
                          </span>
                        </h4>
                      ) : (
                        <h4 className="text-gray-800 text-[16px]">Rs. {item.price}</h4>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ✅ Footer actions */}
        <div className="mt-4 space-y-3">
          {cart.length <= 0 ? (
            ''
          ): <>
            <button className="w-full py-2 bg-black text-white rounded-md">
            Checkout - Rs.{totalAmount} PKR
          </button>
          <button className="w-full py-2 border border-black/20 rounded-md">
            View Cart
          </button></>}
          <p
            className="text-center py-2 border border-black/20 rounded-md cursor-pointer"
            onClick={() => setShowCart(false)}
          >
            Continue Shopping
          </p>
        </div>
      </motion.div>
    </aside>
  );
};

export default CartSection;
