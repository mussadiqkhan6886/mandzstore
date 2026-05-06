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
      <Link
      href={`/collections/${res[0].link}`}
      className="relative block w-full h-[500px] md:h-[600px] overflow-hidden rounded-2xl"
    >
      {/* Image */}
      <Image
        src={res[0].image}
        alt="main banner hero image large screen"
        fill
        priority
        className="object-cover"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-12 text-white gap-3">
        <h1 className="text-2xl capitalize md:text-4xl font-bold max-w-xl leading-tight">
          {res[0].title}
        </h1>

        <span className="text-sm md:text-base text-white/80">
          Discover the latest collection made for you
        </span>

        {/* CTA button (NOT nested Link) */}
        <div>
          <span className="inline-block px-5 py-2 rounded-lg bg-white text-black font-medium text-sm hover:bg-zinc-200 transition">
            Shop Now
          </span>
        </div>
      </div>
    </Link>
      <div className='flex flex-col items-center justify-center gap-4 md:gap-7 py-9'>
        <h2 className={`${cormorant.className} uppercase text-3xl md:text-4xl`}>for women like you</h2>
        <p className='text-gray-800 text-sm text-center px-4 md:px-0 '>M&Z Store is more than modest fashion — it’s a community built on shared values. We create for women who choose elegance over excess, intention over impulse.</p>
      </div>
    </section>
  )
}

export default Hero
