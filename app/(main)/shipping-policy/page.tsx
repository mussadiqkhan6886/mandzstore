import { cormorant } from '@/lib/fonts';
import React from 'react';

import type { Metadata } from 'next';

export const generateMetadata = (): Metadata => {
  return {
    title: 'Shipping Policy',
    description:
      'Learn about our Shipping Policy, delivery times, and shipping charges at M&Z Store. We deliver nationwide across Pakistan.',
    openGraph: {
      title: 'Shipping Policy | M&Z Store',
      description:
        'Learn about our Shipping Policy, delivery times, and shipping charges at M&Z Store. We deliver nationwide across Pakistan.',
      url: 'https://mzstorepk.com/shipping-policy',
      siteName: 'M&Z Store',
    },
  };
};


const page = () => {
  return (
    <main className="pt-40 max-w-2xl mx-auto px-6">
      <div>
        <h1 className={`${cormorant.className} text-5xl text-center uppercase mb-6`}>
          Shipping Policy
        </h1>

        <p className="my-4 text-sm">
          You can find our Shipping policy mentioned below:
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">Shipping Rates</h2>
        <p className="text-sm mb-4">
          Our Standard Shipping Rate is <strong>Rs 300</strong> for Pakistan.  
          We offer <strong>Free Shipping on orders above Rs 4500</strong> (this may be altered during any sale or promotion).
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">Delivery Time</h2>
        <p className="text-sm mb-4">
          Deliveries are generally completed within <strong>4–5 business days</strong>.  
          Actual delivery time may vary slightly depending on your location and courier service.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">Additional Information</h2>
        <p className="text-sm mb-4">
          - Orders are processed on business days (Monday–Friday).  
          - Once your order is shipped, you will receive a tracking number via email or SMS.  
          - We are not responsible for delays caused by courier services or unforeseen circumstances.
        </p>

        <p className="my-6 text-sm">
          For any questions regarding shipping, please contact our support team via email: maaz52364@gmail.com.
        </p>
      </div>
    </main>
  );
};

export default page;
