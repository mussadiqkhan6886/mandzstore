import { cormorant } from '@/lib/fonts'
import Image from 'next/image'
import React from 'react'

const Hero = () => {
  return (
    <section>
      <Image src={"/main_hero_large.jpg"} alt='main banner hero image large screen' width={1000} height={1000} className='w-full h-full' />
      <div className='flex flex-col items-center justify-center gap-7 py-9'>
        <h1 className={`${cormorant.className} uppercase text-4xl`}>for women like you</h1>
        <p className='text-gray-800 text-sm'>M&Z Store is more than modest fashion — it’s a community built on shared values. We create for women who choose elegance over excess, intention over impulse.</p>
      </div>
      <Image src={"/second_hero_image_large.jpg"} alt='second banner hero image large screen' width={1000} height={1000} className='w-full h-full' />
    </section>
  )
}

export default Hero
