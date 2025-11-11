import HeaderProduct from '@/components/MainComp/HeaderProduct';
import { collectionsData } from '@/lib/constants';
import React from 'react';
import SortWrapper from '@/components/MainComp/Sorting';

const SingleCollection = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const slug = (await params).slug;
  const data = collectionsData.find(item => item.slug === slug);

  if (!data) return <div>Collection not found</div>;

  return (
    <main className="max-w-7xl mx-auto my-16 px-4 xl:px-0 pt-24">
      <HeaderProduct title={data.title} desc={data.desc} />
      <p className="text-sm text-gray-500 mb-6 text-center md:text-left">
        Disclaimer: Colour may slightly differ from the actual picture due to lighting
        and the device being used to view it.
      </p>

      <div className='mb-10 relative'>
        <p className='absolute top-3 md:top-5'>{data.products.length} Products</p>
        <div>
          <SortWrapper products={data.products} slug={slug} />
        </div>
      </div>
    </main>
  );
};

export default SingleCollection;
