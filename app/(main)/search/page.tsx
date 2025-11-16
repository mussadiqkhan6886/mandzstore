import type { Metadata } from 'next';
import React from "react";
import axios from "axios";
import HeaderProduct from "@/components/MainComp/HeaderProduct";
import SearchCard from "@/components/MainComp/SearchCard";

async function getData(query: string) {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/search?q=${query}`);
  return res.data.products;
}

export const generateMetadata = (): Metadata => { return {
  title: "Search Result"
} };

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const query = (await searchParams).q || "";
  const products = query ? await getData(query) : [];

  const updatedSlug =
  products.length > 0 && products[0].collection
    ? products[0].collection
        .split('-')
        .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    : '';


  return (
    <main className="max-w-7xl mx-auto px-4 py-40">
      <HeaderProduct
        title={`Search results for "${query}"`}
        desc={`Showing results matching your search query.`}
      />

      {products.length > 0 ? (
        <div className="mt-10">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-8">
          {products.map((product: Product) => (
            <SearchCard key={product._id} {...product} oldSlug={updatedSlug} />
          ))}
        </div>
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-20">
          No products found matching “{query}”.
        </p>
      )}
    </main>
  );
}
