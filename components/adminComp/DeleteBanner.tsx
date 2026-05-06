'use client';

import axios from 'axios';
import React, { useState } from 'react'
import { FiTrash } from 'react-icons/fi'

const DeleteBanner = ({publicId}: {publicId: string}) => {
    const [loading , setLoading] = useState(false)
     const deleteImage = async () => {
        const conf = window.confirm("You sure you wanna delete banner image?") 
          if (!conf) return; 
          setLoading(true)
        try {
        await axios.delete("/api/bannerImage", {
            data: { publicId }
        });
        alert("Deleted refresh page")
        } catch (err) {
        console.error("Delete failed:", err);
        }finally{
            setLoading(false)
        }
    };

  return (
    <button onClick={deleteImage} className='absolute z-50 bg-red-600 p-2 rounded-2xl  top-10 cursor-pointer right-10'>
       {loading ? <div className='animate-spin border-2 border-white border-t-transparent bg-transparent w-3 h-3 rounded-full' /> :  <FiTrash color='white' />}
    </button>
  )
}

export default DeleteBanner
