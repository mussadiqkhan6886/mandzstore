'use client';

import axios from 'axios';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  FiHome, FiMenu, FiMessageSquare, FiPackage,
  FiPlusCircle, FiShoppingBag, FiTruck, FiX
} from 'react-icons/fi';

const Header = () => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const menuItems = [
    { name: 'Home', href: '/admin-dashboard', icon: <FiHome className="w-4 h-4" /> },
    { name: 'Testimonials', href: '/admin-dashboard/testimonials', icon: <FiMessageSquare className="w-4 h-4" /> },
    { name: 'Products', href: '/admin-dashboard/products-list', icon: <FiPackage className="w-4 h-4" /> },
    { name: 'Add Product', href: '/admin-dashboard/add-product', icon: <FiPlusCircle className="w-4 h-4" /> },
    { name: 'Orders', href: '/admin-dashboard/orders-list', icon: <FiShoppingBag className="w-4 h-4" /> },
    { name: 'Delivery', href: '/admin-dashboard/delivery', icon: <FiTruck className="w-4 h-4" /> },
    { name: 'NavBar', href: '/admin-dashboard/navbar', icon: <FiMenu className="w-4 h-4" /> },
  ];

  const pathname = usePathname();
  const router = useRouter();

  if (pathname === '/admin-dashboard/login') return null;

  const logout = async () => {
    await axios.get('/api/logout');
    router.push('/admin-dashboard/login');
  };

  return (
    <>
      {/* Top Header */}
      <header className="flex items-center justify-between bg-white px-4 sm:px-6 py-4 shadow-sm border-b">
        <h1 className="text-xl sm:text-3xl font-semibold text-main">Admin Panel</h1>

        <div className="flex items-center gap-2 sm:gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 bg-black text-white px-3 py-2 sm:px-4 rounded-lg text-sm"
          >
            <FiHome className="w-4 h-4" />
            <span className="hidden sm:inline">Go Home</span>
          </Link>

          <button className="underline cursor-pointer text-sm" onClick={logout}>
            Logout
          </button>

          {/* Hamburger — mobile only */}
          <button
            className="sm:hidden p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition"
            onClick={() => setMobileNavOpen((prev) => !prev)}
            aria-label="Toggle navigation"
          >
            {mobileNavOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Desktop Nav */}
      <nav className="hidden sm:block border-b shadow-sm bg-white">
        <ul className="flex flex-wrap items-center justify-center gap-1 px-6 py-3 text-gray-600">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition hover:bg-gray-100 hover:text-gray-900 ${
                  pathname === item.href ? 'bg-gray-900 text-white hover:bg-gray-800 hover:text-white' : ''
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile Nav — dropdown */}
      {mobileNavOpen && (
        <nav className="sm:hidden bg-white border-b shadow-md">
          <ul className="flex flex-col px-4 py-2 gap-1 text-gray-600">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  onClick={() => setMobileNavOpen(false)}
                  className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm transition hover:bg-gray-100 hover:text-gray-900 ${
                    pathname === item.href ? 'bg-gray-900 text-white hover:bg-gray-800 hover:text-white' : ''
                  }`}
                >
                  {item.icon}
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </>
  );
};

export default Header;