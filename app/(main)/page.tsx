import FrontCollection from '@/components/MainComp/FrontCollection'
import Hero from '@/components/MainComp/Hero'
import Reviews from '@/components/MainComp/Reviews'
import Trust from '@/components/MainComp/Trust'
import WhatsAppButton from '@/components/MainComp/WhatsApp'
import React from 'react'

const Home = () => {
  return (
    <main className='pt-24 lg:pt-14'>
      <WhatsAppButton />
      <Hero />
      <FrontCollection />
      <Trust />
      <Reviews />
    </main>
  )
}

export default Home
