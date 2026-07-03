import Image from 'next/image';
import Link from 'next/link';

interface Variant {
  price: number;
  stock: number;
  image: string[];
  onSale: boolean;
  newPrice: number | null;
}

type Props = {
  _id: string;
  name: string;
  slug: string;
  variants: Variant[];
  oldSlug?: string;
};

const ProductCard = ({ _id, name, slug, variants, oldSlug }: Props) => {
  const first = variants[0];
  const inStock = variants.some((v) => v.stock > 0); // in stock if ANY variant has stock
  // const totalStock = variants.reduce((sum, v) => sum + v.stock, 0);

  const content = (
    <>
      <div className="overflow-hidden h-[200px] md:h-[400px] relative">
        {!inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-sm font-medium z-10">
            Out of Stock
          </div>
        )}
        <Image
          src={first.image[0]}
          alt={name}
          width={400}
          height={420}
          className={`w-full h-full object-cover transition-all duration-500 ease-in-out scale-100 group-hover:scale-105 ${
            !inStock ? 'opacity-60' : ''
          }`}
        />
      </div>

      <div className="text-center mt-3">
        <h3 className="tracking-widest md:uppercase text-[12px] md:text-sm mb-1">{name}</h3>
        <h4 className="text-gray-700">
          {first.onSale ? (
            <span>
              <span className="line-through text-sm opacity-85">Rs. {first.price}</span>{' '}
              <span className="font-medium text-[17px]">Rs. {first.newPrice}</span>{' '}
              <span className="text-red-500 inline-block ml-4">
                Save Rs. {first.price - first.newPrice!}
              </span>
            </span>
          ) : (
            'Rs. ' + first.price
          )}
        </h4>
        {/* <h4 className="flex items-center justify-center gap-1 my-1 text-sm">
          <span className={`w-2 h-2 inline-block rounded-full ${inStock ? 'bg-green-500' : 'bg-red-500'}`} />
          Stock: {totalStock} Available
        </h4> */}
      </div>
    </>
  );

  return (
    <div className="relative group cursor-pointer overflow-hidden transition-all duration-300">
      {inStock ? (
        <Link href={`${oldSlug}/${slug}`}>{content}</Link>
      ) : (
        <div className="cursor-not-allowed">{content}</div>
      )}
    </div>
  );
};

export default ProductCard;