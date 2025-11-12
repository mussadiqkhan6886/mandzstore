import { cormorant } from '@/lib/fonts';
import React from 'react';

const page = () => {
  return (
    <main className="pt-40 max-w-3xl mx-auto px-6">
      <div>
        <h1
          className={`${cormorant.className} text-5xl text-center uppercase mb-6`}
        >
          Terms of Service
        </h1>

        <p className="my-4 text-sm">
          Welcome to our website! By accessing or using our services, you agree
          to be bound by the following terms and conditions. Please read them
          carefully.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">1. Use of Website</h2>
        <p className="text-sm mb-4">
          You agree to use our website for lawful purposes only. You must not
          use our services to post or transmit any harmful, illegal, or
          unauthorized content.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">2. Orders and Payments</h2>
        <p className="text-sm mb-4">
          All orders are subject to acceptance and availability. Payment must
          be completed before the order is processed. We reserve the right to
          cancel any order due to stock unavailability or payment issues.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">3. Shipping and Delivery</h2>
        <p className="text-sm mb-4">
          Delivery times are estimates and may vary depending on your location
          and shipping provider. We are not responsible for delays caused by
          third-party carriers.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">4. Returns and Refunds</h2>
        <p className="text-sm mb-4">
          No refunds and returns.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">5. Privacy</h2>
        <p className="text-sm mb-4">
          We value your privacy and handle your personal information according
          to our Privacy Policy. By using our services, you consent to the
          collection and use of your data as described.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">6. Limitation of Liability</h2>
        <p className="text-sm mb-4">
          We are not liable for any indirect, incidental, or consequential
          damages arising from your use of our website or products. Our total
          liability is limited to the amount paid for the purchased product.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">7. Changes to Terms</h2>
        <p className="text-sm mb-4">
          We reserve the right to update these Terms of Service at any time.
          Changes will be effective immediately upon posting on the website.
          Please check back periodically.
        </p>

        <p className="my-6 text-sm">
          By using our website, you acknowledge that you have read, understood,
          and agree to be bound by these Terms of Service.
        </p>
      </div>
    </main>
  );
};

export default page;
