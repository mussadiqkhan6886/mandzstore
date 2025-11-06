import { byCollection } from '@/lib/constants'
import { cormorant } from '@/lib/fonts'
import Image from 'next/image'
import React from 'react'

const ByCollection = () => {
  return (
    <section>
        <h3 className={`${cormorant.className} text-4xl uppercase text-center mb-5`}>shop by collections</h3>
        <div className='flex gap-5 px-10'>
            {byCollection.map((item, i) => (
                <div key={i}>
                    <div className='overflow-hidden'>
                    <Image className='rounded-xl hover:scale-105 duration-500 ease-in-out cursor-pointer' src={item.image} alt={item.title} width={300} height={300} />
                    </div>
                    <p className='text-center text-2xl mt-5'>{item.title}</p>
                </div>
            ))}
        </div>
    </section>
  )
}

export default ByCollection
