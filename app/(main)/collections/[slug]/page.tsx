import HeaderProduct from '@/components/MainComp/HeaderProduct'
import React from 'react'

const SingleCollection = async ({params}: {params: Promise<{slug:string}>}) => {

  const slug = (await params).slug
  return (
    <main className='max-w-7xl mx-auto'>
        <HeaderProduct title='' desc='' />
    </main>
  )
}

export default SingleCollection
