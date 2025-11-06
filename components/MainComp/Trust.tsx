import { trustData } from '@/lib/constants'
import { cormorant } from '@/lib/fonts'
import React from 'react'

const Trust = () => {
  return (
    <section className='flex items-center justify-center gap-10 my-16'>
      {trustData.map((item, i) => (
        <div key={i} className='text-center gap-2 flex items-center flex-col w-[250px]'>
            <item.icon className='text-4xl' />
            <p className={`${cormorant.className} text-[22px] font-semibold`}>{item.heading}</p>
            <p className='text-sm'>{item.desc}</p>
        </div>
      ))}
    </section>
  )
}

export default Trust
