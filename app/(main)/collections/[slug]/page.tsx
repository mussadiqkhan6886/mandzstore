import HeaderProduct from '@/components/MainComp/HeaderProduct'
import ProductCard from '@/components/MainComp/ProductCard'
import { collectionsData } from '@/lib/constants'
import React from 'react'

const SingleCollection = async ({params}: {params: Promise<{slug:string}>}) => {

  const slug = (await params).slug

  const data = collectionsData.filter(item => item.slug === slug)
  console.log(data)
  return (
    <main className='max-w-7xl mx-auto my-16'>
      {data.map(item => (
        <section key={item.title}>
        <HeaderProduct title={item.title} desc={item.desc} />
        <p className='mb-10 font-gray-900 italic text-sm'> <span className='font-semibold'>Disclaimer:</span> Colour may slightly differ from the actual picture, due to lighting and the device being used to view it. (Read: COLOUR DISCLAIMER)</p>
        <div className='mb-10'>
          <p>{data.map(item => item.products.length)[0]} Products</p>
        </div>
        <section className='grid grid-cols-3 gap-10'>
          {item.products.map(product => (
            <ProductCard key={product.id} {...product} slug={slug} />
          ))}
        </section>
        </section>
      ))}
    </main>
  )
}

export default SingleCollection
