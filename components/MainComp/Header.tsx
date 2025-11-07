'use client';

import React from 'react';
import { upperHeaderData } from '@/lib/constants';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import {FiMenu, FiSearch, FiShoppingCart} from "react-icons/fi"

import 'swiper/css';

const Header = () => {
  return (
    <header className='sticky top-0 w-full bg-white z-50' >
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

      <div className="flex justify-between items-center py-6 px-8 md:px-12">
        <button className="text-2xl">
          <FiMenu />
        </button>

        <div >
          <h1 className='font-bold text-3xl md:text-4xl'>MZ STORE</h1>
        </div>

        <div className="flex items-center space-x-4">
          <button><FiSearch className='text-2xl' /></button>
          <button><FiShoppingCart className='text-2xl' /></button>
        </div>
      </div>
    </header>
  );
};

export default Header;
