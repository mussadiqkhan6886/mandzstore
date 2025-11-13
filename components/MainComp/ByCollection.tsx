'use client';

import { cormorant } from '@/lib/fonts';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

type Props = {
  image: string;
  link: string;
  title: string;
};

const ByCollection = ({ data, header }: { data: Props[]; header: string }) => {
  return (
    <section className="py-10">
      <h3
        className={`${cormorant.className} text-4xl uppercase text-center mb-8`}
      >
        {header}
      </h3>

      <div>
        <Swiper
          spaceBetween={20}
          slidesPerView={3}
          grabCursor={true}
          breakpoints={{
            320: { slidesPerView: 2 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            // 1280: { slidesPerView: 4 },
          }}
          className="pb-5 px-40"
        >
          {data.map((item, i) => (
            <SwiperSlide key={i}>
              <div className="overflow-hidden justify-center flex flex-col items-center">
                <Link href={item.link}>
                  <Image
                    className="rounded-xl hover:scale-105 w-full h-[350px] duration-500 ease-in-out cursor-pointer"
                    src={item.image}
                    alt={item.title}
                    width={300}
                    height={300}
                  />
                </Link>
                <p className="text-center text-2xl mt-5">{item.title}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default ByCollection;
