import { trustData } from '@/lib/constants'
import { cormorant } from '@/lib/fonts'
import React from 'react'

const Trust = () => {
  return (
    <section className='grid  w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-7xl mx-auto gap-10 my-16 place-items-center px-4'>
      {trustData.map((item, i) => (
        <div key={i} className='text-center gap-2 flex items-center flex-col justify-center w-[250px] px-10 sm:px-0'>
            <item.icon className='text-3xl md:text-4xl' />
            <p className={`${cormorant.className} text-[18px] md:text-[22px] font-semibold`}>{item.heading}</p>
            <p className='text-[12px] sm:text-sm'>{item.desc}</p>
        </div>
      ))}
    </section>
  )
}

export default Trust
