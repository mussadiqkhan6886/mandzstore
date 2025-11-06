import ByCollection from '@/components/MainComp/ByCollection'
import Gift from '@/components/MainComp/Gift'
import Hero from '@/components/MainComp/Hero'
import Trust from '@/components/MainComp/Trust'
import React from 'react'

const Home = () => {
  return (
    <main>
      <Hero />
      <Trust />
      <ByCollection />
      <Gift />
    </main>
  )
}

export default Home
