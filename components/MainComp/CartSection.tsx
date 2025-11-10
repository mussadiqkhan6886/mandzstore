'use client';

import React from 'react'
import { FiX } from 'react-icons/fi'
import { motion } from 'framer-motion';

type Props = {
    showCart: boolean
    setShowCart: React.Dispatch<React.SetStateAction<boolean>>
}

const CartSection = ({showCart, setShowCart}: Props) => {
  return (
    <aside className='w-full h-screen top-0 bg-black/30 absolute flex justify-end z-50' onClick={() => setShowCart(false)}>
      <motion.div animate={{ x: 0 }}
        initial={{ x: 400 }}
        transition={{ type: "tween", duration: 0.25, ease: 'easeInOut'  }} className='bg-white w-[370px] pt-6 px-6 flex justify-between flex-col'
        onClick={(e) => e.stopPropagation()}>
        <div className='flex justify-between items-center'>
            <p className='font-semibold text-xl'>Your Cart</p>
            <FiX className='cursor-pointer text-xl' onClick={() => setShowCart(false)} />
        </div>
        <div className='text-center'>
            Cart Is Empty
        </div>
        <p className='text-center py-2 border border-black/20 mb-2 cursor-pointer' onClick={() => setShowCart(false)}>Continue Shopping</p>
      </motion.div>
    </aside>
  )
}

export default CartSection
