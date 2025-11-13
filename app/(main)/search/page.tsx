import React from "react";
import axios from "axios";
import SortWrapper from "@/components/MainComp/Sorting";
import HeaderProduct from "@/components/MainComp/HeaderProduct";
import ProductCard from "@/components/MainComp/ProductCard";

async function getData(query: string) {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/search?q=${query}`);
  return res.data.products;
}

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const query = (await searchParams).q || "";
  const products = query ? await getData(query) : [];

  console.log(products)

   const updatedSlug = products.collection
    .split("-")
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

    console.log(updatedSlug)

  return (
    <main className="max-w-7xl mx-auto px-4 py-40">
      <HeaderProduct
        title={`Search results for "${query}"`}
        desc={`Showing results matching your search query.`}
      />

      {products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product: Product) => (
          <ProductCard key={product._id} {...product} oldSlug={updatedSlug} />
        ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-20">
          No products found matching “{query}”.
        </p>
      )}
    </main>
  );
}
