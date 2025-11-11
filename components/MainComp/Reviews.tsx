'use client';

import React, { useEffect, useState } from 'react'
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { cormorant } from '@/lib/fonts';
import axios from 'axios';

export default function Reviews() {

  const [data, setData] = useState([])

  
  const fetchData = async () => {
    try {
      const res = await axios.get("/api/testimonials");
      console.log(res)
      setData(res.data.testimonials); // ✅ use fetched data
    } catch (err) {
      console.error("Failed to fetch reviews:", err);
    }
  };

  useEffect(() => {
    fetchData()
  }, [])

  // if (!data.length) return <p className="text-center py-10">Loading reviews...</p>;

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
        {data.map((review) => (
          <SwiperSlide key={review._id}>
            <div className="bg-white shadow-md rounded-2xl p-6 h-full flex flex-col justify-between">
              <p className="text-gray-700 mb-4">"{review.message}"</p>
              <div>
                <h4 className="font-semibold text-lg">{review.name}</h4>
                <p className="text-sm text-gray-500">{review.designation}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
