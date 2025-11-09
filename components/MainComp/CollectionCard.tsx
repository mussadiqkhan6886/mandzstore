'use client';


import { cormorant } from '@/lib/fonts'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { motion } from 'framer-motion'

const CollectionCard = ({title, link, image, delay}: {title: string, link: string, image: string, delay: number}) => {

    const variants = {
            hidden: {
                opacity: 0
            },
            show: {
                opacity: 1
            }
        }

  return (
    <motion.div variants={variants} whileInView={"show"} initial="hidden" viewport={{once: true, amount: 0.2}} transition={{delay: delay}} className='overflow-hidden'>
        <Link className='relative overflow-hidden w-full h-full' href={link}>
            <Image src={image} alt={title} width={250} height={250} className='w-full h-full object-cover object-center hover:scale-105 hover:brightness-90 duration-400' />
            <h2 className={`${cormorant.className} absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white uppercase p-4 tracking-widest w-full text-center bg-black/10`}>{title}</h2>
        </Link>
    </motion.div>
  )
}

export default CollectionCard
