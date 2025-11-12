import React from "react";
import axios from "axios";
import SortWrapper from "@/components/MainComp/Sorting";
import HeaderProduct from "@/components/MainComp/HeaderProduct";
HeaderProduct

async function getData(query: string) {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/search?q=${query}`);
  return res.data.products;
}

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const query = (await searchParams).q || "";
  const products = query ? await getData(query) : [];

  return (
    <main className="max-w-7xl mx-auto px-4 py-40">
      <HeaderProduct
        title={`Search results for "${query}"`}
        desc={`Showing results matching your search query.`}
      />

      {products.length > 0 ? (
        <div className="mt-10">
          <SortWrapper products={products} slug="search-results" />
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-20">
          No products found matching “{query}”.
        </p>
      )}
    </main>
  );
}
