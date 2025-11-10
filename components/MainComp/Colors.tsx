'use client';

import React, { useState } from 'react'

const Colors = ({colors}: {colors: string[]}) => {
    const [selectedColor, setSelectedColor] = useState("")
  return (
    <div className='flex flex-wrap gap-4 mt-2 flex-col items-start'>
        <p>Color: {selectedColor}</p>
        <div className='flex gap-4'>
        {colors.map((color, i) => (
            <div onClick={() => setSelectedColor(color)} key={i} className={`${selectedColor === color ? "bg-black text-white" : ""} px-4 py-1 border border-black/30 text-sm cursor-pointer`}>
            {color}
            </div>
        ))}
    </div>
    </div>
  )
}

export default Colors
