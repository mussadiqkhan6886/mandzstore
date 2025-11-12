import HeaderProduct from '@/components/MainComp/HeaderProduct';
import { collectionsData } from '@/lib/constants';
import React from 'react';
import SortWrapper from '@/components/MainComp/Sorting';
import { Product } from '@/lib/models/ProductSchema';
import { connectDB } from '@/lib/config/database/db';

const SingleCollection = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const slug = (await params).slug;

  let data = collectionsData.find(item => item.slug === slug);

  // For main category pages (Dupatta / Hijab)
  if (slug === "dupatta" || slug === "hijab") {
    data = {
      title: slug.charAt(0).toUpperCase() + slug.slice(1),
      slug,
      desc: `Explore our full collection of ${slug}s.`,
    };
  }

  const updatedSlug = slug
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  await connectDB();

  let products;

  if (slug === "dupatta" || slug === "hijab") {
    // Fetch all products whose collection ENDS WITH Dupatta/Hijab (case-insensitive)
    products = await Product.find({
      collection: { $regex: `${updatedSlug}$`, $options: 'i' },
    }).lean();
  } else {
    // Fetch exact match for other collections
    products = await Product.find({
      collection: { $regex: new RegExp(`^${updatedSlug}$`, 'i') },
    }).lean();
  }

  if (!products || products.length === 0) {
    return (
      <main className="max-w-7xl mx-auto my-16 px-4 xl:px-0 pt-24">
        <HeaderProduct title={data.title} desc={data.desc} />
        <p className="text-center text-gray-500 my-10">
          No products found in this collection.
        </p>
      </main>
    );
  }

  const safeProducts = JSON.parse(JSON.stringify(products));

  return (
    <main className="max-w-7xl mx-auto my-16 px-4 xl:px-0 pt-24">
      <HeaderProduct title={data.title} desc={data.desc} />
      <p className="text-sm text-gray-500 mb-6 text-center md:text-left">
        Disclaimer: Colour may slightly differ from the actual picture due to lighting
        and the device being used to view it.
      </p>

      <div className="mb-10 relative">
        <p className="absolute top-3 md:top-5">{safeProducts.length} Products</p>
        <div>
          <SortWrapper key={slug} products={safeProducts} slug={slug} />
        </div>
      </div>
    </main>
  );
};

export default SingleCollection;
