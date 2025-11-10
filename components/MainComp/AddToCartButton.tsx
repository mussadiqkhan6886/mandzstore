'use client';

import { useCart } from '@/hooks/useCart';
import React, { useState } from 'react'
import Colors from './Colors';

interface Props {
    id: number
    images: string[]
    price: number
    onSale: boolean
    newPrice: number | null
    name: string
    quantity: number
    colors: string[] | undefined
}

const AddToCartButton = ({id, images, price, onSale, newPrice, name, quantity, colors}: Props) => {

    const {addToCart, cart, totalAmount} = useCart()
    const [selectedColor, setSelectedColor] = useState("")
    console.log(cart)
    console.log(totalAmount)

  return (
    <>
        <button  onClick={() => addToCart({id, images, price, onSale, newPrice, name, quantity, selectedColor})} className="bg-black text-white px-6 py-3  hover:bg-gray-800 transition w-full">
        Add to Cart
        </button>
        {colors && <Colors colors={colors} selectedColor={selectedColor} setSelectedColor={setSelectedColor} />}
    </>
  )
}

export default AddToCartButton
