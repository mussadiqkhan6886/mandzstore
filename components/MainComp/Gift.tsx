import { cormorant } from '@/lib/fonts'
import Image from 'next/image'
import React from 'react'

const Gift = () => {
  return (
    <section className='flex flex-col lg:flex-row my-8'>
      <div>
        <Image src={"/giftImage.jpg"} alt='gift image' width={1000} height={1000} className='w-full h-full' />
      </div>
      <div className='flex items-center justify-center flex-col py-10 lg:py-0 bg-zinc-100'>
        <h4 className={`${cormorant.className} text-4xl mb-3 text-center`}>A SPECIAL GIFT FOR HER</h4>
        <p className='text-center px-6 text-gray-800 mb-3'>From Hijab Bouquets to Gift Boxes - Each one designed to make her feel truly special!</p>
        <button className='bg-black text-white px-8 text-sm py-3 mt-4'>Explore Bouquets and Boxes</button>
      </div>
    </section>
  )
}

export default Gift
