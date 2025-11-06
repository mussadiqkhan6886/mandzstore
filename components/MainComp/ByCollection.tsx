import { cormorant } from '@/lib/fonts'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {
    image: string,
    link: string
    title: string
}

const ByCollection = ({data, header}: {data: Props[], header: string}) => {
  return (
    <section>
        <h3 className={`${cormorant.className} text-4xl uppercase text-center mb-5`}>{header}</h3>
        <div className='flex gap-5 px-10'>
            {data.map((item, i) => (
                <div key={i}>
                    <div className='overflow-hidden'>
                        <Link href={item.link}>
                            <Image className='rounded-xl hover:scale-105 duration-500 ease-in-out cursor-pointer' src={item.image} alt={item.title} width={300} height={300} />
                        </Link>
                    </div>
                    <p className='text-center text-2xl mt-5'>{item.title}</p>
                </div>
            ))}
        </div>
    </section>
  )
}

export default ByCollection
