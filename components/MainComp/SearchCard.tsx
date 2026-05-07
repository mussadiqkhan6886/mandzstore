import Image from 'next/image';
import Link from 'next/link';

type Props = {
  _id: string;
  name: string;
  images: string;
  price: number;
  slug: string;
  newPrice: number | null;
  onSale: boolean;
  oldSlug?: string;
  stock: number
};

const SearchCard = ({
  _id,
  name,
  images,
  price,
  slug,
  newPrice,
  onSale,
  oldSlug,
  stock
}: Props) => {

  const content = (
    <>
      <div className="overflow-hidden h-[200px] md:h-[400px] relative">
        <Image
          src={images}
          alt={name}
          width={400}
          height={420}
          className={`w-full h-full object-cover object-bottom transition-all duration-500 ease-in-out scale-100 group-hover:scale-105`}
        />
      </div>

      <div className="text-center mt-3">
        <h3 className="tracking-widest md:uppercase text-[12px]  md:text-sm mb-1">{name}</h3>
        <h4 className="text-gray-700">
          {onSale ? (
            <span>
              <span className="line-through text-sm opacity-85">Rs. {price}</span>{' '}
              <span className="font-medium text-[17px]">Rs. {newPrice}</span>{' '}
              <span className="text-red-500 inline-block ml-4">
                Save Rs. {price - newPrice!}
              </span>
            </span>
          ) : (
            'Rs.' + price
          )}
        </h4>
        {/* <h4 className='text-sm my-1 flex items-center gap-2 justify-center'>{inStock ? <span className="w-2 h-2 inline-block bg-green-500 rounded-full"></span> : <span className="w-2 h-2 inline-block bg-red-500 rounded-full"></span>} Stock: {stock} Available</h4> */}
      </div>
    </>
  );

  return (
    <>
    <div
      className="relative group cursor-pointer overflow-hidden transition-all duration-300"
    >
        <Link href={`/collections/${oldSlug}/${slug}`}>{content}</Link>
    </div>
    </>
  );
};

export default SearchCard;
