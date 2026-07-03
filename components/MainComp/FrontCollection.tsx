import { connectDB } from '@/lib/config/database/db';
import { Product } from '@/lib/models/ProductSchema';
import React from 'react'
import HomeCollection from './HomeCollection';

export const revalidate = 120;

const getProducts = async () => {
  await connectDB()
  const products = await Product.find({}).lean<Product[]>()
  return products
}
const FrontCollection = async () => {

  const res = await getProducts()
  const products = JSON.parse(JSON.stringify(res))

  return (
    <section>
      <HomeCollection products={products} />
    </section>
  )
}

export default FrontCollection
