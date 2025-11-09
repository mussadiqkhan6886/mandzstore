import { cormorant } from '@/lib/fonts'
import Image from 'next/image'
import React from 'react'

const Vision = () => {
  return (
    <section className='flex flex-col lg:flex-row my-20 gap-4'>
        <div className='flex-1'>
            <Image src={"/vision.png"} alt='gift image' width={1000} height={1000} className='w-full h-full md:scale-115' />
        </div>
        <div className='flex flex-1 text-center lg:text-left justify-center flex-col px-10 lg:px-0 lg:pr-20 bg-zinc-100 gap-6 pt-5 md:pt-0 lg:pl-16'>
            <h4 className={`${cormorant.className} text-4xl mb-3`}>A SHARED VISION</h4>
            <p className='text-gray-800'>M&Z Store began with two stories woven by intention.</p>
            <p className=' text-gray-800 mb-3'>One of us had just embraced the hijab, searching for elegance and ease. The other, during lockdown, could not find hijabs that matched her style — so we created our own.
            <br />
            <br />
            What started as a personal pursuit became a brand trusted by thousands. Today, M&Z continues with that same vision: refined, breathable, and made for women who expect more.
            </p>
        </div>
    </section>
  )
}

export default Vision
