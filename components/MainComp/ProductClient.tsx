'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { FiX } from 'react-icons/fi';
import { FaCheck } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { cormorant } from '@/lib/fonts';
import CollapseDetails from './CollapseDetails';
import { useCart } from '@/hooks/useCart';

import 'swiper/css';
import 'swiper/css/pagination';

export default function ProductClient({ product }: { product: Product }) {
  const [selectedVariant, setSelectedVariant] = useState<Variant>(product.variants[0]);
  const [show, setShow] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const { addToCart } = useCart();

 // If only 1 variant → show all its images; if multiple variants → show first image of each
const allImages: string[] =
  product.variants.length === 1
    ? product.variants[0].image
    : product.variants.map((v) => v.image[0]);

// For the main display image, track index instead of matching by value
const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    if (!show) return;
    const t = setTimeout(() => setShow(false), 2000);
    return () => clearTimeout(t);
  }, [show]);

  allImages[selectedImageIndex]

 const handleAddToCart = () => {
  if (selectedVariant.stock === 0) return;
  addToCart({
    id: product._id,
    variantId: selectedVariant._id,   // ← add this
    images: product.variants.length === 1
  ? product.variants[0].image     
  : [selectedVariant.image[0]],
    price: selectedVariant.price,
    onSale: selectedVariant.onSale,
    newPrice: selectedVariant.newPrice,
    name: `${product.name} — ${selectedVariant.title}`,
    quantity: 1,
    selectedColor: selectedVariant.title,
    stock: selectedVariant.stock,
  });
  setShow(true);
};
  const inStock = selectedVariant.stock > 0;

  return (
    <section className="flex flex-col lg:flex-row gap-8 xl:gap-14">
      {/* ── LEFT: IMAGE GALLERY ── */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Thumbnails — all variant images */}
        <div className="md:flex hidden relative flex-col gap-2">
          {allImages.slice(0, 5).map((img, i) => (
            <div
              key={i}
              className={`w-24 h-24 border cursor-pointer overflow-hidden transition ${
                selectedImageIndex === i ? 'border-black' : 'border-gray-300'
              }`}
              onClick={() => {
                setSelectedImageIndex(i);
                // if multiple variants, clicking thumbnail changes selected variant
                if (product.variants.length > 1) {
                  setSelectedVariant(product.variants[i]);
                }
              }}
            >
              <Image src={img} alt={`variant ${i}`} width={120} height={80} className="object-cover w-full h-full" />
            </div>
          ))}
          {allImages.length > 5 && (
            <button
              onClick={() => setShowAll(true)}
              className="w-24 h-24 absolute bg-black/40 underline cursor-pointer bottom-0 text-white font-semibold"
            >
              View All
            </button>
          )}
        </div>

        {/* View All Modal */}
        {showAll && (
          <div className="fixed inset-0 bg-black/60 z-50 flex">
            <FiX
              onClick={() => setShowAll(false)}
              className="text-3xl absolute right-10 top-10 text-white border border-white rounded-full p-1 cursor-pointer"
            />
            <div className="max-w-[1700px] mx-auto w-full h-full px-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 place-items-center overflow-y-auto max-h-screen pt-20 pb-10 scrollbar-hide">
                {allImages.map((img, i) => (
                    <div
                      key={i}
                      className={`md:w-[200px] md:h-[180px] border cursor-pointer overflow-hidden ${
                        selectedImageIndex === i ? 'border-black' : 'border-gray-300'
                      }`}
                      onClick={() => {
                        setSelectedImageIndex(i);
                        if (product.variants.length > 1) setSelectedVariant(product.variants[i]);
                        setShowAll(false);
                      }}
                    >
                    <Image unoptimized loading="lazy" src={img} alt={`variant ${i}`} width={80} height={80} className="object-cover w-full h-full" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Main image — desktop */}
        <div className="w-full hidden md:flex h-full mb-2 xl:w-[560px] border border-gray-200 overflow-hidden">
          <Image
            src={allImages[selectedImageIndex]}
            alt={product.name}
            width={500}
            height={400}
            className="object-cover object-center w-full h-full transition-all duration-300"
          />
        </div>

        {/* Mobile swiper */}
        <div className="md:hidden w-full">
          <Swiper
            modules={[Pagination]}
            spaceBetween={10}
            slidesPerView={1}
            loop={true}
            pagination={{ clickable: true }}
            className="productSwiper"
           onSlideChange={(swiper) => {
            const idx = swiper.realIndex % allImages.length;
            setSelectedImageIndex(idx);
            if (product.variants.length > 1) {
              setSelectedVariant(product.variants[idx % product.variants.length]);
            }
          }}
          >
            {allImages.map((img, i) => (
              <SwiperSlide key={i}>
                <div className="w-full h-[400px] rounded overflow-hidden">
                  <Image src={img} alt={`image ${i}`} width={600} height={400} className="object-cover w-full h-full" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* ── RIGHT: PRODUCT DETAILS ── */}
      <div className="flex-1 pt-6 md:pt-0 flex flex-col gap-6">
        <h1 className={`${cormorant.className} text-2xl text-center md:text-left md:text-3xl tracking-widest uppercase`}>
          {product.name}
        </h1>

        {/* Price */}
        <div>
          <h2 className="text-gray-700">
            {selectedVariant.onSale ? (
              <span>
                <span className="line-through text-sm opacity-85">Rs. {selectedVariant.price}</span>{' '}
                <span className="font-medium text-[19px]">Rs. {selectedVariant.newPrice}</span>{' '}
                <span className="text-red-500 inline-block ml-4">
                  Save Rs. {selectedVariant.price - (selectedVariant.newPrice ?? 0)}
                </span>
              </span>
            ) : (
              `Rs. ${selectedVariant.price}`
            )}
          </h2>
          <p className="text-sm text-gray-500">Shipping calculated at checkout.</p>
          <h4 className="flex mt-3 items-center text-gray-700 gap-2 my-1 text-sm">
            <span className={`w-2 h-2 inline-block rounded-full ${inStock ? 'bg-green-500' : 'bg-red-500'}`} />
            Stock: {selectedVariant.stock} Available
          </h4>
          {/* {selectedVariant.sku && (
            <p className="text-xs text-gray-400 mt-1">SKU: {selectedVariant.sku}</p>
          )} */}
        </div>

        <hr className="opacity-10" />

        {/* Variant Selector */}
        <div>
          <p className="text-sm font-semibold mb-3 text-gray-700">
            Select Design:{' '}
            <span className="font-normal text-gray-500">{selectedVariant.title}</span>
          </p>
          <div className="flex flex-wrap gap-2">
            {product.variants.map((v) => (
              <button
                key={v._id}
                onClick={() => {
                  setSelectedVariant(v);
                  // jump to that variant's position in allImages
                  const idx = product.variants.indexOf(v);
                  setSelectedImageIndex(idx);
                }}
                className={`relative group border rounded-lg overflow-hidden transition-all duration-200 ${
                  selectedVariant._id === v._id
                    ? 'border-black ring-2 ring-black ring-offset-1'
                    : 'border-gray-200 hover:border-gray-400'
                }`}
              >
               <Image
                  src={v.image[0]}   // always show first image as the variant thumbnail
                  alt={v.title}
                  width={64}
                  height={64}
                  className="w-16 h-16 object-cover"
                />
                {/* Out of stock overlay */}
                {v.stock === 0 && (
                  <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
                    <span className="text-[9px] font-bold text-gray-500 text-center leading-tight px-1">
                      Out of<br />Stock
                    </span>
                  </div>
                )}
                {/* Selected check */}
                {selectedVariant._id === v._id && (
                  <div className="absolute top-1 right-1 w-4 h-4 bg-black rounded-full flex items-center justify-center">
                    <FaCheck className="text-white text-[8px]" />
                  </div>
                )}
                {/* Tooltip */}
                <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] px-2 py-0.5 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition pointer-events-none z-10">
                  {v.title}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Add to Cart */}
        <button
          onClick={handleAddToCart}
          disabled={!inStock}
          className={`w-full px-6 py-3 rounded-md transition font-medium ${
            !inStock
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-black text-white hover:bg-gray-800'
          }`}
        >
          {inStock ? 'Add to Cart' : 'Out of Stock'}
        </button>

        <CollapseDetails desc={product.description} />
      </div>

      {/* Toast */}
      {show && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-3 bg-white text-black px-5 py-3 rounded-lg shadow-xl border border-gray-100 animate-fade-in">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100">
            <FaCheck className="text-green-600 text-sm" />
          </div>
          <span className="text-sm font-medium">Added to cart successfully</span>
        </div>
      )}
    </section>
  );
}