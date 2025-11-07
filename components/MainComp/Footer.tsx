import { cormorant } from '@/lib/fonts'
import Link from 'next/link'
import React from 'react'
import { FiFacebook, FiInstagram, FiYoutube } from 'react-icons/fi'


const helpData = [
    {title: "Contact Us", link: "#"},
    {title: "F.A.Qs", link: "#"},
    {title: "Colour Disclaimer", link: "#"},
    {title: "Privacy Policy", link: "#"},
    {title: "Shipping Policy", link: "#"},
    {title: "Terms of Servic", link: "#"},
    {title: "Refund Policy", link: "#"},
]

const Footer = () => {
  return (
    <footer className='flex gap-3 flex-col bg-black p-10 text-white'>
      <div className='flex flex-col md:flex-row gap-15 lg:gap-[200px]'>
        <div className='flex gap-10 md:w-[50%]'>
        <div className='pr-10 md:pr-20'>
            <p className={`${cormorant.className} uppercase mb-4 text-sm tracking-widest`}>Mission Statement</p>
            <p className='text-[12px]'>At M&Z, we craft timeless, high-quality scarves designed with a deep respect for style, comfort, and sustainability. Our mission is to celebrate self-expression through ethical craftsmanship and intentional design.</p>
            <p className='text-[12px] italic mt-4'>
                <span className='font-semibold'> Accessibility Statement</span>
                <br />
                Kef is dedicated to creating a website experience that is accessible and inclusive for everyone.
                If you encounter any difficulties using our site or have suggestions for improvement, please reach out to us at: hello@kefuk.com</p>
        </div>
        <div>
            <p className={`${cormorant.className} uppercase mb-4 text-sm tracking-widest`}>help</p>
            <ul>
                {helpData.map((item, i) => (
                    <li className='mb-1' key={i}>
                        <Link className='text-sm whitespace-nowrap' href={item.link}>{item.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
        </div>
        <div className='flex gap-16 text-sm'>
            <div className='w-[50%]'>
                <p className={`${cormorant.className} uppercase mb-4 text-sm tracking-widest`}>contact us</p>
                <div>
                    <p className='mb-4'><span className='font-semibold'>Address: </span> Building 1C, 1st Sunset Commercial Street, Phase 4, Defence, Karachi.</p>
                    <p className='mb-4'><span className='font-semibold'>Phone:</span> 0316-2222064</p>
                    <p><span className='font-semibold'>Email:</span> info@kefpk.com</p>
                </div>
            </div>
            <div>
                <p className={`${cormorant.className} uppercase mb-4 text-sm tracking-widest`}>Social</p>
                <div className='flex gap-3'>
                    <FiInstagram className='text-2xl' />
                    <FiFacebook className='text-2xl' />
                    <FiYoutube className='text-2xl' />
                </div>
            </div>
        </div>
      </div>
      <div className='text-center text-[13px] mt-10'>
        &copy; {new Date().getFullYear()} M&Z Store
      </div>
    </footer>
  )
}

export default Footer
