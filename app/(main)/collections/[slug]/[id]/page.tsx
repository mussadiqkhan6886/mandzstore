import ImageProduct from '@/components/MainComp/ImageProduct';
import { cormorant } from '@/lib/fonts';
import CollapseDetails from '@/components/MainComp/CollapseDetails';
import AddToCartButton from '@/components/MainComp/AddToCartButton';
import { Product } from '@/lib/models/ProductSchema';
import { connectDB } from '@/lib/config/database/db';
import SortWrapper from '@/components/MainComp/Sorting';
import HeaderProduct from '@/components/MainComp/HeaderProduct';
import ProductCard from '@/components/MainComp/ProductCard';
import Link from 'next/link';
import Image from 'next/image';

// export const generateStaticParams = async () => {
//   await connectDB();
//   const products = await Product.find({}).lean();
//   return products.map(product => ({ id: product.slug }));
// };

const ProductPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  await connectDB();

  const res = await Product.findOne({slug: id}).lean()

  const product = JSON.parse(JSON.stringify(res))

  const response = await Product.find({
      collection: { $regex: new RegExp(`^${product.collection}$`, 'i') },
    }).limit(3).lean();

  const products = JSON.parse(JSON.stringify(response));

  
  const updatedSlug = product.collections
    .split("-")
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  if (!product) {
    return <div className="text-center py-20">Product not found</div>;
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-16 pt-44">
      <section className="flex flex-col lg:flex-row gap-18">
        {/* LEFT: IMAGES */}
        <ImageProduct images={product.images} name={product.name} />

        {/* RIGHT: PRODUCT DETAILS */}
        <div className="flex-1 flex flex-col gap-6">
          <h1 className={`${cormorant.className} text-2xl text-center md:text-left md:text-4xl tracking-widest uppercase`} >{product.name}</h1>
          <div>
           <h2 className="text-gray-700">Rs. {product.onSale ? <span><span className='line-through text-sm opacity-85'>{product.price}</span> <span className='font-medium text-[19px]'>{product.newPrice}</span>  <span className='text-red-500 inline-block ml-4'>save RS {product.price - product.newPrice}</span></span> : product.price }</h2>
            <p className="text-sm text-gray-500">Shipping calculated at checkout.</p>
          </div>

          <hr className='opacity-10' />
          {/* Add to Cart */}
         <AddToCartButton id={product._id} images={product.images} price={product.price} onSale={product.onSale} name={product.name} newPrice={product.newPrice} quantity={1} colors={product.colors}  />
          {/* <div className='mt-6'>
            <h3 className='font-medium text-gray-800 tracking-widest uppercase'>Description:</h3>
            <p>{product.desc}</p>
          </div> */}
         
          <CollapseDetails desc={product.description} />
        </div>
      </section>
           <div className='pt-16'>
            <HeaderProduct title='May you like' desc="May You like these awesome related products" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.slice(0,3).map((product: Product) => (
              <div  
                    className="relative group cursor-pointer overflow-hidden  transition-all duration-300"
                  >
                    <Link href={`/collections/${updatedSlug}/${product.slug}`}>
                    <div className="overflow-hidden">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        width={400}
                        height={420}
                        className="w-full h-full object-cover transition-all duration-500 ease-in-out scale-100 group-hover:scale-105"
                      />
                    </div>
              
                    {/* Info */}
                    <div className="text-center mt-3">
                      <h3 className="tracking-widest uppercase text-sm mb-1">{product.name}</h3>
                      <h4 className="text-gray-700">{product.onSale ? <span><span className='line-through text-sm opacity-85'>Rs. {product.price}</span> <span className='font-medium text-[17px]'>Rs. {product.newPrice}</span>  <span className='text-red-500 inline-block ml-4'>Save Rs. {product.price - product.newPrice!}</span></span> : "Rs." + product.price }</h4>
                    </div>
                    </Link>
                  </div>
            ))}
            </div>
          </div>
    </main>
  );
};

export default ProductPage;
