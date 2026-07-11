import { cache } from 'react';
import { notFound } from 'next/navigation';
import { Product } from '@/lib/models/ProductSchema';
import { connectDB } from '@/lib/config/database/db';
import HeaderProduct from '@/components/MainComp/HeaderProduct';
import Link from 'next/link';
import Image from 'next/image';
import ProductClient from '@/components/MainComp/ProductClient';
import { Metadata } from 'next';
import MetaViewContent from '@/components/adminComp/MetaViewContent';

export const revalidate = 120;

const toSlug = (value: string) =>
  value.trim().toLowerCase().replace(/\s+/g, '-');

const getProduct = cache(async (id: string) => {
  await connectDB();
  const res = await Product.findOne({ slug: id }).lean();
  return res ? JSON.parse(JSON.stringify(res)) : null;
});

export const generateStaticParams = async () => {
  await connectDB();
  const products = await Product.find({}).lean();
  return products.map((product: any) => ({
    slug: toSlug(product.collection),
    id: product.slug,
  }));
};

export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> }
): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    return { title: 'Product Not Found | M&Z Store' };
  }

  const canonicalSlug = toSlug(product.collection);
  const url = `https://www.mzstorepk.com/collections/${canonicalSlug}/${product.slug}`;

  return {
    title: `${product.name} | M&Z Store`,
    description: product.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${product.name} | M&Z Store`,
      description: product.description,
      url,
      siteName: 'M&Z Store',
      images: [
        {
          url: product.variants[0].image[0],
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
      locale: 'en_PK',
      type: 'website',
    },
  };
}

const ProductPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  await connectDB();
  const response = await Product.aggregate([
    { $match: { collection: product.collection, slug: { $ne: product.slug } } },
    { $sample: { size: 4 } },
  ]);
  const related = JSON.parse(JSON.stringify(response));

  return (
    <main className="max-w-7xl mx-auto px-4 py-16 pt-30 sm:pt-36">

      <ProductClient product={product} />

      <div className="pt-16">
        <HeaderProduct title="May you like" desc="May You like these awesome related products" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-8">
          {related.slice(0, 3).map((p: any) => {
            const firstVariant = p.variants?.[0];
            const relatedSlug = toSlug(p.collection);
            return (
              <div key={p._id} className="relative group cursor-pointer overflow-hidden transition-all duration-300">
                <Link href={`/collections/${relatedSlug}/${p.slug}`}>
                  <div className="overflow-hidden h-[200px] md:h-[350px]">
                    <Image
                      src={firstVariant?.image[0] || ''}
                      alt={p.name}
                      width={400}
                      height={420}
                      className="w-full h-full object-cover transition-all duration-500 ease-in-out scale-100 group-hover:scale-105"
                    />
                  </div>
                  <div className="text-center mt-3">
                    <h3 className="tracking-widest md:uppercase text-[12px] md:text-sm mb-1">{p.name}</h3>
                    <h4 className="text-gray-700">
                      {firstVariant?.onSale ? (
                        <span>
                          <span className="line-through text-sm opacity-85">Rs. {firstVariant.price}</span>{' '}
                          <span className="font-medium text-[17px]">Rs. {firstVariant.newPrice}</span>{' '}
                          <span className="text-red-500 inline-block ml-2">
                            Save Rs. {firstVariant.price - firstVariant.newPrice}
                          </span>
                        </span>
                      ) : (
                        `Rs. ${firstVariant?.price}`
                      )}
                    </h4>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default ProductPage;