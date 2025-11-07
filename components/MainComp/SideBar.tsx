// components/SideBar.tsx
'use client';
import React, { useState } from 'react';
import { FiChevronDown, FiChevronUp, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { sidebarData } from '@/lib/constants';
import Link from 'next/link';

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SIDEBAR_WIDTH = 320; // keeps numbers consistent with CSS

const SideBar: React.FC<Props> = ({ isOpen, setIsOpen }) => {

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleMenu = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        // backdrop container (fades)
        <motion.div
          key="backdrop"
          className="fixed inset-0 z-50 flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          {/* click on backdrop to close */}
          <div
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-white/30"
          />

          {/* sidebar (slides horizontally) */}
          <motion.aside
            key="sidebar"
            initial={{ x: -SIDEBAR_WIDTH }}
            animate={{ x: 0 }}
            exit={{ x: -SIDEBAR_WIDTH }}
            transition={{ type: 'tween', duration: 0.25, ease: 'easeInOut' }}
            className="relative h-screen w-[340px] bg-white shadow-xl"
            // prevent clicks from closing when inside sidebar
            onClick={(e) => e.stopPropagation()}
          >
            <FiX
              onClick={() => setIsOpen(false)}
              className="absolute right-5 top-5 cursor-pointer text-xl"
            />

            <div className="p-6 pt-20">
              <ul>
              {sidebarData.map((item, i) => (
                <motion.li initial={{ opacity: 0, y:200 }}
          animate={{ opacity: 1, y:0 }} transition={{ type: 'tween', duration: 0.25, ease: 'easeInOut', delay: item.delay }} key={i}>
                  <div
                    className="flex w-full tracking-widest uppercase border-t border-black/10 pt-3 justify-between cursor-pointer mb-3 text-lg items-center"
                  >
                    {item.children ? (
                      <p onClick={() => toggleMenu(i)}>{item.title}</p>
                    ) : (
                      <Link className="w-full" href={item.link}>
                        {item.title}
                      </Link>
                    )}

                  {item.children && (
                    <div onClick={() => toggleMenu(i)}>
                      {openIndex === i ? (
                        <FiChevronUp className="text-xl" />
                      ) : (
                        <FiChevronDown className="text-xl" />
                            )}
                          </div>
                        )}
                      </div>

                      {item.children && openIndex === i && (
                        <ul className="ml-2 mb-3 space-y-2 text-sm text-gray-700">
                          {item.children.map((child, j) => (
                            <motion.li initial={{ opacity: 0, y:200 }}
          animate={{ opacity: 1, y:0 }} transition={{ type: 'tween', duration: 0.25, ease: 'easeInOut'}}  key={j}>
                              <Link href={child.link}>{child.title}</Link>
                            </motion.li>
                          ))}
                        </ul>
                      )}
                    </motion.li>
                  ))}
                </ul>
              </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SideBar;
