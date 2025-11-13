import ByCollection from '@/components/MainComp/ByCollection'
import Hero from '@/components/MainComp/Hero'
import Reviews from '@/components/MainComp/Reviews'
import Trust from '@/components/MainComp/Trust'
import Vision from '@/components/MainComp/Vision'
import WhatsAppButton from '@/components/MainComp/WhatsApp'
import { byCollection } from '@/lib/constants'
import React from 'react'

const Home = () => {
  return (
    <main className='pt-24 lg:pt-14'>
      <WhatsAppButton />
      <Hero />
      <Trust />
      <ByCollection data={byCollection} header='shop by collection' />
      <Vision />
      <Reviews />
    </main>
  )
}

export default Home
