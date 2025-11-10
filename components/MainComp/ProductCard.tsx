'use client';

import { useCart } from '@/hooks/useCart';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

type Props = {
    id: number
  name: string;
  images: string[];
  price: number;
  slug: string
  newPrice: number
  onSale: boolean
};

const ProductCard = ({id, name, images, price, slug, newPrice, onSale }: Props) => {
  const [currentImage, setCurrentImage] = useState(images[0]);
  // const [hover, setHover] = useState(false);

  return (
    <div  
      onMouseEnter={() => {
        setCurrentImage(images[1]);
        // setHover(true);
      }}
      onMouseLeave={() => {
        setCurrentImage(images[0]);
        // setHover(false);
      }}
      className="relative group cursor-pointer overflow-hidden  transition-all duration-300"
    >
      <Link href={`${slug}/${id}`}>
      <div className="overflow-hidden">
        <Image
          src={currentImage}
          alt={name}
          width={400}
          height={420}
          className="w-full h-full object-cover transition-all duration-500 ease-in-out scale-100 group-hover:scale-105"
        />
      </div>

      {/* Info */}
      <div className="text-center mt-3">
        <h3 className="tracking-widest uppercase text-sm mb-1">{name}</h3>
        <h4 className="text-gray-700">{onSale ? <span><span className='line-through text-sm opacity-85'>Rs. {price}</span> <span className='font-medium text-[17px]'>Rs. {newPrice}</span>  <span className='text-red-500 inline-block ml-4'>Save Rs. {price - newPrice}</span></span> : price }</h4>
      </div>
      </Link>
      {/* Add to Cart Button
      <button
        className={`absolute bottom-20 left-1/2 -translate-x-1/2 px-5 py-2 bg-black text-white font-semibold shadow-md transition-all duration-300 w-[90%] cursor-pointer ${
          hover
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-5 pointer-events-none'
        }`}
      >
        Add to Cart
      </button> */}
    </div>
  );
};

export default ProductCard;
