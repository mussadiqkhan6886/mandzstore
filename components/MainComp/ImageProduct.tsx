'use client';

import React, { useState } from 'react'
import Image from 'next/image';
import { FiX } from 'react-icons/fi';

const ImageProduct = ({images, name}: {images: string[], name: string}) => {
      const [mainImage, setMainImage] = useState(images[0]);
      const [show, setShow] = useState(false)
  return (
   <div className="flex flex-col md:flex-row gap-4">
          <div className="md:flex hidden relative flex-col gap-2">
            {images.slice(0,5).map((img, i) => (
              <div
                key={i}
                className={`w-24 h-24 border cursor-pointer  overflow-hidden ${
                  mainImage === img ? 'border-black' : 'border-gray-300'
                }`}
                onClick={() => setMainImage(img)}
              >
                <Image
                  src={img}
                  alt={`thumbnail ${i}`}
                  width={120}
                  height={80}
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
            <button onClick={() => setShow(true)} className='w-24 h-24 absolute bg-black/40 underline cursor-pointer bottom-0 text-white font-semibold'>View All</button>
          </div>

          {show && (
            <div className='fixed bg-black/60 h-screen w-full top-0 z-50 left-0'>
              <FiX onClick={() => setShow(false)} className='text-3xl absolute right-10 top-10 text-white border border-white rounded-full p-1 cursor-pointer' />
              <div className='max-w-[1700px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 overflow-y-scroll xl:grid-cols-5 gap-4 place-items-center w-full h-full px-20'>
                {images.map((img, i) => (
                    <div
                      key={i}
                      className={`w-[200px] h-[180px] border cursor-pointer  overflow-hidden ${
                        mainImage === img ? 'border-black' : 'border-gray-300'
                      }`}
                      onClick={() => {setMainImage(img)
                        setShow(false)
                      }}
                    >
                      <Image
                        unoptimized
                        loading="lazy"
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
          )}

          <div className="w-full mb-2 xl:w-[560px] h-full border border-gray-200 overflow-hidden">
            <Image
              src={mainImage}
              alt={name}
              width={500}
              height={400}
              className="object-cover object-center w-full h-full"
            />
          </div>
          <div className="flex relative md:hidden flex-row gap-2">
            {images.slice(0,3).map((img, i) => (
              <div
                key={i}
                className={`w-full h-20 border cursor-pointer  overflow-hidden ${
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
            <button onClick={() => setShow(true)} className='w-full h-12 absolute bg-black/40 underline cursor-pointer -bottom-16 right-0 text-white font-semibold'>View All Images</button>
              </div>
            ))}
          </div>
        </div>
  )
}

export default ImageProduct
