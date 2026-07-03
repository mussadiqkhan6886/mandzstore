'use client';

import { cormorant } from '@/lib/fonts';
import React, { useEffect, useMemo, useState } from 'react'
import SearchCard from './SearchCard';
import Link from 'next/link';

const HomeCollection = ({products}: {products: Product[]}) => {
  const [current, setCurrent] = useState('dupatta');

    const filteredData = useMemo(
    () => products.filter((item) => item.collection.toLowerCase().includes(current)),
    [products, current]
  );

  return (
    <section className="my-20 max-w-7xl flex flex-col items-center mx-auto px-4">
      <h3 className={`${cormorant.className} text-3xl md:text-4xl uppercase my-8 text-center`}>
        Wrap Yourself in Style
      </h3>

      {/* Category Tabs */}
      <div className="flex justify-center gap-6 mb-10">
        {['dupatta', 'chaddar', 'hijab'].map((item) => (
          <button
            key={item}
            onClick={() => setCurrent(item)}
            className={`uppercase tracking-widest text-sm border-b-2 transition-all duration-200 ${
              current === item ? 'border-black font-semibold' : 'border-transparent text-gray-500'
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-8">
        {filteredData.slice(0, 8).map((product) => (
          <SearchCard key={product._id} _id={product._id}
            name={product.name}
            images={product.variants[0].image[0]}
            price={product.variants[0].price}
            slug={product.slug}
            newPrice={product.variants[0].newPrice}
            onSale={product.variants[0].onSale}
            oldSlug={product.collection} // optional if you want to keep it
            stock={product.variants[0].stock} />
        ))}
      </div>
      <Link className='bg-black px-6 py-3 mt-10 text-sm text-white font-semibold' href={`/collections/${current}`}>View All</Link>
    </section>
  )
}

export default HomeCollection
