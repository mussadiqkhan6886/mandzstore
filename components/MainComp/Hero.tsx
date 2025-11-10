import { cormorant } from '@/lib/fonts'
import Image from 'next/image'
import React from 'react'

const Hero = () => {
  return (
    <section>
      <picture>
        <source media="(max-width: 767px)" srcSet="/main_hero_small.jpg" />
         <Image src={"/main_hero_large.jpg"} alt='main banner hero image large screen' width={1000} height={1000} className='w-full h-full' />
    </picture>
      <div className='flex flex-col items-center justify-center gap-4 md:gap-7 py-9'>
        <h1 className={`${cormorant.className} uppercase text-3xl md:text-4xl`}>for women like you</h1>
        <p className='text-gray-800 text-sm text-center px-4 md:px-0 '>M&Z Store is more than modest fashion — it’s a community built on shared values. We create for women who choose elegance over excess, intention over impulse.</p>
      </div>
      <picture>
        <source media="(max-width: 767px)" srcSet="/small.jpg" />
         <Image src={"/large.jpg"} alt='second main banner hero image large screen' width={1000} height={1000} className='w-full h-full' />
      </picture>
    </section>
  )
}

export default Hero
