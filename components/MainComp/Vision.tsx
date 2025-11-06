import { cormorant } from '@/lib/fonts'
import Image from 'next/image'
import React from 'react'

const Vision = () => {
  return (
    <section className='flex my-20 gap-26'>
        <div className='flex-1'>
            <Image src={"/vision.png"} alt='gift image' width={1000} height={1000} className='w-full h-full scale-115' />
        </div>
        <div className='flex flex-1 justify-center flex-col pr-20 bg-zinc-100 gap-6'>
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
