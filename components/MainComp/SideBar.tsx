// components/SideBar.tsx
'use client';
import React from 'react';
import { FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SIDEBAR_WIDTH = 320; // keeps numbers consistent with CSS

const SideBar: React.FC<Props> = ({ isOpen, setIsOpen }) => {
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

            {/* Sidebar content goes here */}
            <div className="p-6 pt-16">Your content...</div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SideBar;
