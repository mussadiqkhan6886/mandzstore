'use client';

import { reviews } from '@/lib/constants';
import React from 'react'
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { cormorant } from '@/lib/fonts';

export default function Reviews() {
  return (
    <section className="py-10 bg-gray-50 max-w-5xl mx-auto">
      <h4 className={`${cormorant.className} text-4xl text-center md:text-left mb-8 uppercase`}>Customer Reviews</h4>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        navigation
        modules={[Navigation]}
        breakpoints={{
          320: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="custom-swiper"
      >
        {reviews.map((review) => (
          <SwiperSlide key={review.id}>
            <div className="bg-white shadow-md rounded-2xl p-6 h-full flex flex-col justify-between">
              <p className="text-gray-700 mb-4">"{review.review}"</p>
              <div>
                <h4 className="font-semibold text-lg">{review.name}</h4>
                <p className="text-sm text-gray-500">{review.role}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
