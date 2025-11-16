'use client';

import React, { useEffect, useState } from 'react'
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { cormorant } from '@/lib/fonts';
import axios from 'axios';
import Link from 'next/link';

export default function Reviews() {

  const [data, setData] = useState<reviewType[]>([])
  const [loading, setLoading] = useState(false)
  
  const fetchData = async () => {
    try {
      const res = await axios.get("/api/testimonials");
      setData(res.data.testimonials); // ✅ use fetched data
      setLoading(true)
    } catch (err) {
      console.error("Failed to fetch reviews:", err);
    } finally{
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchData()
  }, [])

  if (loading) return <p className="text-center py-10">Loading reviews...</p>;

  return (
    <section className="py-10 bg-gray-50 max-w-5xl mx-auto">
      <div className='flex items-center justify-between mb-8 px-2'>
        <h4 className={`${cormorant.className} text-2xl md:text-4xl text-center sm:uppercase`}>Customer Reviews</h4>
        <button className="bg-black text-white px-2 sm:px-3.5 py-1.5 sm:py-3 text-sm cursor-pointer"><Link href={"/add-testimonial"}>Add Review</Link></button>
      </div>
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
