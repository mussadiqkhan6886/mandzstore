'use client';

import React, { useState } from 'react';
import {FiMenu, FiSearch, FiShoppingCart, FiX} from "react-icons/fi"
import SideBar from './SideBar';
import CartSection from './CartSection';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

const Header = () => {

  const [showSideBar, setShowSideBar] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [showCart, setShowCart] = useState(false)
  const pathname = usePathname()
  const router = useRouter();
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setShowSearch(false)
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  if(pathname.includes("checkout")){
    return (
    <header className='bg-white py-2 border-b border-black/40'>
      <Link href={"/"}>
        <Image src={"/logo.jpeg"} alt='logo header main' width={100} height={100}/>
      </Link>
    </header>
    )
  }

  return (
    <header className='fixed top-0 w-full bg-white z-50' >
        {showSideBar && <SideBar isOpen={showSideBar} setIsOpen={setShowSideBar} />}
      <div className="flex overflow-y-hidden justify-between items-center py-1 px-6 md:px-12">
        <button aria-label="menu icon button" onClick={() => setShowSideBar(true)} className="text-2xl cursor-pointer">
          <FiMenu aria-label="menu icon" />
        </button>

        <Link href={"/"} >
          <Image src={"/logo.jpeg"} className='scale-120' alt='logo header main' width={100} height={100}/>
        </Link>

        <div className="flex items-center space-x-4 md:space-x-6">
          <button aria-label="search icon button" onClick={() => setShowSearch(true)}><FiSearch aria-label="search icon" className='text-xl md:text-2xl cursor-pointer' /></button>
          <button aria-label="shopping cart button" onClick={() => setShowCart(true)}><FiShoppingCart aria-label="shopping cart icon" className='text-xl md:text-2xl cursor-pointer' /></button>
        </div>
      </div>
      {showSearch && (
        <div className='bg-white/30 absolute h-screen w-full top-7'>
          <form onSubmit={handleSearch} className='bg-gray-100 py-8 flex items-center justify-center gap-6'>
            <div className='border border-black/30 py-1.5 px-2 flex items-center w-[70%] pr-4'>
              <input type='text' placeholder='Search' value={query} onChange={(e) => setQuery(e.target.value)} className='outline-none w-full px-3' />
              <FiSearch aria-label="search button icon" className='text-xl' />
            </div>
            <button type='submit'><FiX onClick={() => setShowSearch(false)} className='text-xl cursor-pointer' /></button>
          </form>
        </div>
      )}
      {showCart && <CartSection showCart={showCart} setShowCart={setShowCart} />}
    </header>
  );
};

export default Header;
