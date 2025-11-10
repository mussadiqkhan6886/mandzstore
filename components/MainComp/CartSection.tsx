'use client';

import React from 'react'
import { FiTrash, FiX } from 'react-icons/fi'
import { motion } from 'framer-motion';
import { useCart } from '@/hooks/useCart';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  showCart: boolean;
  setShowCart: React.Dispatch<React.SetStateAction<boolean>>;
};

const CartSection = ({ showCart, setShowCart }: Props) => {
  const { cart, updateQuantity, removeFromCart, totalAmount, totalItems } = useCart();

  return (
    <aside
      className="w-full h-screen top-0 bg-black/30 fixed flex justify-end z-50"
      onClick={() => setShowCart(false)}
    >
      <motion.div
        animate={{ x: 0 }}
        initial={{ x: 400 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="bg-white w-[460px] pt-6 px-4 sm:px-6 flex flex-col justify-between"
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
                <div className="flex gap-0 sm:gap-4 border-b border-gray-200 pb-3" key={i}>
                  <div className="shrink-0">
                    <Image
                      src={item.images[0]}
                      alt={`${item.name} - ${item.selectedColor}`}
                      width={90}
                      height={90}
                      className="w-[90%] sm:w-full"
                    />
                  </div>

                  <div className="flex flex-col justify-between text-left flex-1">
                    <div>
                      <p className="font-medium text-sm">
                        {item.name} <span className="text-gray-500">({item.selectedColor})</span>
                      </p>
                    </div>
                    <div className='flex justify-between'>
                    <div className="flex items-center gap-6 border border-black/30 px-3 py-1">
                      <button className='text-xl' onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                      <p>{item.quantity}</p>
                      <button className='text-xl' onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                    </div>
                      <FiTrash
                        onClick={() => removeFromCart(item.id)}
                        className="cursor-pointer text-gray-500 hover:text-red-500"
                      />
                      </div>

                    <div>
                      {item.onSale ? (
                        <h4 className="text-gray-700 text-[12px] sm:text-sm">
                          <span className="line-through opacity-70">Rs. {item.price}</span>{" "}
                          <span className="font-semibold text-[14px] sm:text-[16px]">Rs. {item.newPrice}</span>{" "}
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
        <div className="space-y-3 my-4">
          {cart.length <= 0 ? (
            ''
          ): <>
            <Link onClick={() => setShowCart(false)} href={"/checkout"} className="w-full block text-center py-2 bg-black text-white ">
            Checkout - Rs.{totalAmount} PKR
          </Link>
          <Link onClick={() => setShowCart(false)} href={"/cart"} className="w-full py-2 block text-center border border-black/20 ">
            View Cart
          </Link></>}
          <p
            className="text-center py-2 border border-black/20  cursor-pointer"
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
