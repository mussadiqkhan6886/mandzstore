'use client';

import { useCart } from '@/hooks/useCart';
import React, { useState } from 'react';
import Colors from './Colors';

interface Props {
  id: number;
  images: string[];
  price: number;
  onSale: boolean;
  newPrice: number | null;
  name: string;
  quantity: number;
  colors: string[] | undefined;
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
}: Props) => {
  const { addToCart } = useCart();
  const [selectedColor, setSelectedColor] = useState('');

  const handleAddToCart = () => {
    // {colors && if (!selectedColor) return; // safety check}

    addToCart({
      id,
      images,
      price,
      onSale,
      newPrice,
      name,
      quantity,
      selectedColor,
    });
  };

  return (
    <div className="space-y-4">
      {/* 🖌️ Color Selector */}
      {colors && (
        <Colors
          colors={colors}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
        />
      )}

      {/* 🛒 Add to Cart Button */}
      {colors ? <button
        onClick={handleAddToCart}
        disabled={!selectedColor}
        className={`w-full px-6 py-3 rounded-md transition
          ${
            !selectedColor
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-black text-white hover:bg-gray-800'
          }`}
      >
        {selectedColor ? 'Add to Cart' : 'Select Color to Add'}
      </button> : <button
        onClick={handleAddToCart}
        className={`w-full px-6 py-3 rounded-md transition bg-black text-white hover:bg-gray-800`}
      >
        Add to Cart
      </button>}
    </div>
  );
};

export default AddToCartButton;
