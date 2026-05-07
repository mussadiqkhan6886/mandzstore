import { cormorant } from '@/lib/fonts';
import CollapseDetails from '@/components/MainComp/CollapseDetails';
import { Product } from '@/lib/models/ProductSchema';
import { connectDB } from '@/lib/config/database/db';
import HeaderProduct from '@/components/MainComp/HeaderProduct';
import Link from 'next/link';
import Image from 'next/image';
import ProductClient from '@/components/MainComp/ProductClient';

export const revalidate = 50;

export const generateStaticParams = async () => {
  await connectDB();
  const products = await Product.find({}).lean();
  return products.map((product) => ({ id: product.slug }));
};

const ProductPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  await connectDB();

  const res = await Product.findOne({ slug: id }).lean();
  const product = JSON.parse(JSON.stringify(res));

  const response = await Product.aggregate([
    { $match: { collection: product.collection, slug: { $ne: product.slug } } },
    { $sample: { size: 4 } },
  ]);
  const related = JSON.parse(JSON.stringify(response));

  const updatedSlug = product.collection
    .split('-')
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  if (!product) return <div className="text-center py-20">Product not found</div>;

  return (
    <main className="max-w-7xl mx-auto px-4 py-16 pt-30 sm:pt-36">
      {/* All interactive variant logic lives in ProductClient */}
      <ProductClient product={product} />

      {/* Related products */}
      <div className="pt-16">
        <HeaderProduct title="May you like" desc="May You like these awesome related products" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-8">
          {related.slice(0, 3).map((p: any) => {
            const firstVariant = p.variants?.[0];
            return (
              <div key={p._id} className="relative group cursor-pointer overflow-hidden transition-all duration-300">
                <Link href={`/collections/${updatedSlug}/${p.slug}`}>
                  <div className="overflow-hidden h-[200px] md:h-[350px]">
                    <Image
                      src={firstVariant?.image || ''}
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