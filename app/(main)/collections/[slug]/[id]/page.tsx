import { collectionsData } from '@/lib/constants';
import ImageProduct from '@/components/MainComp/ImageProduct';
import { cormorant } from '@/lib/fonts';
import ProductCard from '@/components/MainComp/ProductCard';
import Colors from '@/components/MainComp/Colors';
import CollapseDetails from '@/components/MainComp/CollapseDetails';
import AddToCartButton from '@/components/MainComp/AddToCartButton';

const Product = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const productId = parseInt(id);

  const collection = collectionsData.find(col =>
    col.products.find(prod => prod.id === productId)
  );

  const product = collection?.products.find(prod => prod.id === productId);

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
          <h1 className={`${cormorant.className} text-3xl text-center md:text-left md:text-4xl tracking-widest uppercase`} >{product.name}</h1>
          <div>
           <h2 className="text-gray-700">Rs. {product.onSale ? <span><span className='line-through text-sm opacity-85'>{product.price}</span> <span className='font-medium text-[19px]'>{product.newPrice}</span>  <span className='text-red-500 inline-block ml-4'>save RS {product.price - product.newPrice}</span></span> : product.price }</h2>
            <p className="text-sm text-gray-500">Shipping calculated at checkout.</p>
          </div>

          <hr className='opacity-10' />
          {/* Add to Cart */}
         <AddToCartButton id={product.id} images={product.images} price={product.price} onSale={product.onSale} name={product.name} newPrice={product.newPrice} quantity={1} colors={product.colors}  />
          {/* <div className='mt-6'>
            <h3 className='font-medium text-gray-800 tracking-widest uppercase'>Description:</h3>
            <p>{product.desc}</p>
          </div> */}
         
          <CollapseDetails desc={product.desc} />
          
        </div>
      </section>
    </main>
  );
};

export default Product;
