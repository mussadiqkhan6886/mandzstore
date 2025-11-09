import HeaderProduct from '@/components/MainComp/HeaderProduct'
import { collectionsData } from '@/lib/constants'
import React from 'react'

const SingleCollection = async ({params}: {params: Promise<{slug:string}>}) => {

  const slug = (await params).slug

  const data = collectionsData.filter(item => item.slug === slug)
  console.log(data)
  return (
    <main className='max-w-7xl mx-auto'>
      {data.map(item => (
        <section key={item.title}>
        <HeaderProduct title={item.title} desc={item.desc} />
       <p> Disclaimer: Colour may slightly differ from the actual picture, due to lighting and the device being used to view it. (Read: COLOUR DISCLAIMER)</p>
        </section>
      ))}
    </main>
  )
}

export default SingleCollection
