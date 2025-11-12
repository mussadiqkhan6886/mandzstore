import { cormorant } from '@/lib/fonts';
import React from 'react';

const page = () => {
  return (
    <main className="pt-40 max-w-2xl mx-auto px-6">
      <div>
        <h1 className={`${cormorant.className} text-5xl text-center uppercase mb-6`}>
          Color Disclaimer
        </h1>

        <p className="my-4 text-sm">
          We make every effort to display product colors accurately on our website. However, due to differences in screen settings, resolutions, and lighting conditions, the colors you see on your monitor or device may not exactly match the actual product.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">Key Points</h2>
        <ul className="list-disc list-inside text-sm mb-4">
          <li>Colors may vary slightly from product images shown on the website.</li>
          <li>Material texture, lighting, and device display can affect color perception.</li>
          <li>We do not accept returns or exchanges solely due to minor color differences.</li>
        </ul>

        <p className="my-4 text-sm">
          We recommend reviewing product photos carefully and contacting our support team if you have any questions about the color before making a purchase.
        </p>
      </div>
    </main>
  );
};

export default page;
