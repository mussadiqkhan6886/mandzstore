import { connectDB } from '@/lib/config/database/db';
import { cormorant } from '@/lib/fonts'
import { BannerImg } from '@/lib/models/BannerImage';
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export const revalidate = 60;

const Hero = async () => {
  await connectDB()

  const res = await BannerImg.find().lean()
  return (
    <section>
      <Link href={"/collections/hijab"}>
      <Image src={res[0].image} alt='main banner hero image large screen' width={1000} height={1000} className='w-full h-full' priority fetchPriority='high'  />
      </Link>
      <div className='flex flex-col items-center justify-center gap-4 md:gap-7 py-9'>
        <h1 className={`${cormorant.className} uppercase text-3xl md:text-4xl`}>for women like you</h1>
        <p className='text-gray-800 text-sm text-center px-4 md:px-0 '>M&Z Store is more than modest fashion — it’s a community built on shared values. We create for women who choose elegance over excess, intention over impulse.</p>
      </div>
    </section>
  )
}

export default Hero
