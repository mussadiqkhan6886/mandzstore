'use client';

import { cormorant } from '@/lib/fonts';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import SearchCard from './SearchCard';
import { Product } from '@/lib/models/ProductSchema';
import Link from 'next/link';

const FrontCollection = () => {
  const [current, setCurrent] = useState('dupatta');
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch products from API
  const fetchData = async () => {
    try {
      const res = await axios.get('/api/products');
      const response = res.data;
      const filteredData = response.data.filter((item: Product) => item.collection.toLowerCase().includes(current));
      setData(filteredData);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [current]); // refetch when tab changes

  if (loading) return <div className="text-center py-10">Loading...</div>;

  return (
    <section className="my-20 max-w-7xl flex flex-col items-center mx-auto px-4">
      <h4 className={`${cormorant.className} text-3xl md:text-4xl uppercase my-8 text-center`}>
        Wrap Yourself in Style
      </h4>

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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.slice(0, 8).map((product) => (
          <SearchCard key={product._id} _id={product._id}
          name={product.name}
          images={product.images}
          price={product.price}
          slug={product.slug}
          newPrice={product.newPrice}
          onSale={product.onSale}
          oldSlug={product.collection} // optional if you want to keep it
          inStock={product.inStock} />
        ))}
      </div>
      <Link className='bg-black px-6 py-3 text-sm text-white font-semibold' href={`/collections/${current}`}>View All</Link>
    </section>
  );
};

export default FrontCollection;