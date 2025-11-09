import { cormorant } from '@/lib/fonts'
import React from 'react'

const HeaderProduct = ({title, desc}: {title: string, desc: string}) => {
  return (
    <section>
      <h2 className={`${cormorant.className} text-4xl text-center uppercase mb-14`}>{title}</h2>
      <p className='text-gray-900 md:pr-10 mb-10 text-center md:text-left'>{desc}</p>
    </section>
  )
}

export default HeaderProduct
