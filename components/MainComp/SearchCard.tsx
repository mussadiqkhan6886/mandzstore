'use client';

import { useCart } from '@/hooks/useCart';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

type Props = {
  _id: string;
  name: string;
  images: string[];
  price: number;
  slug: string;
  newPrice: number | null;
  onSale: boolean;
  oldSlug?: string;
  inStock: boolean;
};

const SearchCard = ({
  _id,
  name,
  images,
  price,
  slug,
  newPrice,
  onSale,
  oldSlug,
  inStock,
}: Props) => {
  const [currentImage, setCurrentImage] = useState(images[0]);

  const content = (
    <>
      <div className="overflow-hidden relative">
        {!inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-sm font-medium z-10">
            Out of Stock
          </div>
        )}
        <Image
          src={currentImage}
          alt={name}
          width={400}
          height={420}
          className={`w-full h-full object-cover transition-all duration-500 ease-in-out scale-100 group-hover:scale-105 ${
            !inStock ? 'opacity-60' : ''
          }`}
        />
      </div>

      <div className="text-center mt-3">
        <h3 className="tracking-widest uppercase text-sm mb-1">{name}</h3>
        <h4 className="text-gray-700">
          {onSale ? (
            <span>
              <span className="line-through text-sm opacity-85">Rs. {price}</span>{' '}
              <span className="font-medium text-[17px]">Rs. {newPrice}</span>{' '}
              <span className="text-red-500 inline-block ml-4">
                Save Rs. {price - newPrice!}
              </span>
            </span>
          ) : (
            'Rs.' + price
          )}
        </h4>
      </div>
    </>
  );

  return (
    <div
      onMouseEnter={() => setCurrentImage(images[1])}
      onMouseLeave={() => setCurrentImage(images[0])}
      className="relative group cursor-pointer overflow-hidden transition-all duration-300"
    >
      {inStock ? (
        <Link href={`/collections/${oldSlug}/${slug}`}>{content}</Link>
      ) : (
        <div className="cursor-not-allowed">{content}</div>
      )}
    </div>
  );
};

export default SearchCard;
