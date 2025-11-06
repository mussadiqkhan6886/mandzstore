import ByCollection from '@/components/MainComp/ByCollection'
import Gift from '@/components/MainComp/Gift'
import Hero from '@/components/MainComp/Hero'
import Trust from '@/components/MainComp/Trust'
import Vision from '@/components/MainComp/Vision'
import { byCollection, essentials } from '@/lib/constants'
import React from 'react'

const Home = () => {
  return (
    <main>
      <Hero />
      <Trust />
      <ByCollection data={byCollection} header='shop by collection' />
      <Gift />
      <ByCollection data={essentials} header='hijab essentials' />
      <Vision />
    </main>
  )
}

export default Home
