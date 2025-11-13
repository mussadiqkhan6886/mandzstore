'use client';

import React, { useState } from 'react'
import Image from 'next/image';

const ImageProduct = ({images, name}: {images: string[], name: string}) => {
      const [mainImage, setMainImage] = useState(images[0]);
  return (
   <div className="flex gap-4">
          <div className="md:flex hidden flex-col gap-2">
            {images.map((img, i) => (
              <div
                key={i}
                className={`w-20 h-24 border cursor-pointer  overflow-hidden ${
                  mainImage === img ? 'border-black' : 'border-gray-300'
                }`}
                onClick={() => setMainImage(img)}
              >
                <Image
                  src={img}
                  alt={`thumbnail ${i}`}
                  width={80}
                  height={80}
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
          </div>

          <div className="w-full mb-2 md:w-[440px] h-full border border-gray-200 overflow-hidden">
            <Image
              src={mainImage}
              alt={name}
              width={400}
              height={400}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="flex flex-row gap-2">
            {images.map((img, i) => (
              <div
                key={i}
                className={`w-20 h-24 border cursor-pointer  overflow-hidden ${
                  mainImage === img ? 'border-black' : 'border-gray-300'
                }`}
                onClick={() => setMainImage(img)}
              >
                <Image
                  src={img}
                  alt={`thumbnail ${i}`}
                  width={80}
                  height={80}
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
          </div>
        </div>
  )
}

export default ImageProduct
