import { cormorant } from '@/lib/fonts'
import React from 'react'

const HeaderProduct = ({title, desc}: {title: string, desc: string}) => {
  return (
    <section>
      <h2 className={`${cormorant.className} text-4xl text-center uppercase mb-14`}>{title}</h2>
      <p className='text-gray-800 px-10'>{desc}</p>
    </section>
  )
}

export default HeaderProduct
