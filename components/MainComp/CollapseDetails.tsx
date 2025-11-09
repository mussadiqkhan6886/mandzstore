'use client';

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';

const CollapseDetails = () => {
     const [open, setOpen] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpen(prev => (prev === section ? null : section));
  };

  return (
    <div className="mt-6">
            {[
              { title: 'DESCRIPTION', content: 'This product is carefully crafted with premium materials ensuring both comfort and style. Perfect for all occasions.' },
              { title: 'SHIPPING & RETURNS', content: 'Orders are shipped within 2–4 business days. Returns accepted within 7 days of delivery in original condition.' },
              { title: 'CARE INSTRUCTIONS', content: 'Hand wash with mild detergent. Avoid bleach. Dry in shade to maintain fabric quality.' },
            ].map(({ title, content }) => (
              <div
                key={title}
                className="border border-gray-200 overflow-hidden"
              >
                <button
                  className="w-full flex justify-between items-center p-4 font-normal tracking-widest text-sm text-gray-600 bg-gray-50 hover:bg-gray-100 transition text-center"
                  onClick={() => toggleSection(title)}
                >
                  {title}
                  <span className={`transform transition-transform ${open === title ? 'rotate-180' : 'rotate-0'}`}>
                    <FiChevronDown />
                  </span>
                </button>
                <AnimatePresence>
                  {open === title && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-4 pb-4 text-gray-600 text-sm leading-relaxed"
                    >
                      {content}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
  )
}

export default CollapseDetails
