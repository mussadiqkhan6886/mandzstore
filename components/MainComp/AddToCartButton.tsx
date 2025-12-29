'use client';

import { useCart } from '@/hooks/useCart';
import React, { useEffect, useState } from 'react';
import Colors from './Colors';
import { FaCheck } from 'react-icons/fa';

interface Props {
  id: number;
  images: string[];
  price: number;
  onSale: boolean;
  newPrice: number | null;
  name: string;
  quantity: number;
  colors?: string[];
  stock: number
}

const AddToCartButton = ({
  id,
  images,
  price,
  onSale,
  newPrice,
  name,
  quantity,
  colors,
  stock
}: Props) => {
  const { addToCart } = useCart();
  const [selectedColor, setSelectedColor] = useState('');
  const [show, setShow] = useState(false)
  const handleAddToCart = () => {
    if (colors && colors.length > 0 && !selectedColor) {
      // Safety check: if colors exist, ensure one is selected
      return;
    }

    
    addToCart({
      id,
      images,
      price,
      onSale,
      newPrice,
      name,
      quantity,
      selectedColor,
      stock
    });
    setShow(true)

  };

useEffect(() => {
  let timer: NodeJS.Timeout;
  if (show) {
    timer = setTimeout(() => setShow(false), 2000);
  }
  return () => clearTimeout(timer);
}, [show]);

  const hasColors = colors && colors.length > 0;
  return (
    <div className="space-y-4">
      {/* Color Selector */}
      {hasColors && (
        <Colors
          colors={colors}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
        />
      )}

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        disabled={hasColors && !selectedColor}
        className={`w-full px-6 py-3 rounded-md transition
          ${
            hasColors && !selectedColor
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-black text-white hover:bg-gray-800'
          }`}
      >
        {hasColors && !selectedColor ? 'Select Color to Add' : 'Add to Cart'}
      </button>

      {show && (
  <div className="fixed top-6 right-6 z-50 flex items-center gap-3
    bg-white text-black px-5 py-3 rounded-lg shadow-xl
    border border-gray-100
    animate-fade-in">
    
    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100">
      <FaCheck className="text-green-600 text-sm" />
    </div>

    <span className="text-sm font-medium">
      Added to cart successfully
    </span>
  </div>
)}
    </div>
  );
};

export default AddToCartButton;
