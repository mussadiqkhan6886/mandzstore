'use client';

import React, { useState } from 'react';
import { upperHeaderData } from '@/lib/constants';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import {FiMenu, FiSearch, FiShoppingCart, FiX} from "react-icons/fi"

import 'swiper/css';
import SideBar from './SideBar';
import CartSection from './CartSection';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const Header = () => {

  const [showSideBar, setShowSideBar] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [showCart, setShowCart] = useState(false)
  const pathname = usePathname()

  if(pathname.includes("checkout")){
    return (
    <header className='bg-white py-4 border-b border-black/40'>
      <Link href={"/"}>
        <h1 className='text-center text-3xl font-semibold'>M&Z Store</h1>
      </Link>
    </header>
    )
  }

  return (
    <header className='fixed top-0 w-full bg-white z-50' >
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        loop
        className="text-center bg-[#EEECE5] text-[12px] py-2"
      >
        {upperHeaderData.map((item, i) => (
          <SwiperSlide key={i}>
            <p className='py-2 font-semibold uppercase tracking-[0.2em]'>{item}</p>
          </SwiperSlide>
        ))}
      </Swiper>

        {showSideBar && <SideBar isOpen={showSideBar} setIsOpen={setShowSideBar} />}
      <div className="flex justify-between items-center py-6 px-6 md:px-12">
        <button onClick={() => setShowSideBar(true)} className="text-2xl cursor-pointer">
          <FiMenu />
        </button>


        <div >
          <h1 className='font-bold text-3xl md:text-4xl'>MZ STORE</h1>
        </div>

        <div className="flex items-center space-x-4 md:space-x-6">
          <button onClick={() => setShowSearch(true)}><FiSearch className='text-xl md:text-2xl cursor-pointer' /></button>
          <button onClick={() => setShowCart(true)}><FiShoppingCart className='text-xl md:text-2xl cursor-pointer' /></button>
        </div>
      </div>
      {showSearch && (
        <div className='bg-white/30 absolute h-screen w-full top-7'>
          <div className='bg-gray-100 py-8 flex items-center justify-center gap-6'>
            <div className='border border-black/30 py-1.5 px-2 flex items-center w-[70%] pr-4'>
              <input type='text' placeholder='Search' className='outline-none w-full px-3' />
              <FiSearch className='text-xl' />
            </div>
            <FiX onClick={() => setShowSearch(false)} className='text-xl cursor-pointer' />
          </div>
        </div>
      )}
      {showCart && <CartSection showCart={showCart} setShowCart={setShowCart} />}
    </header>
  );
};

export default Header;
