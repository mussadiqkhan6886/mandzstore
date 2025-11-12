import { cormorant } from '@/lib/fonts';
import React from 'react';

const page = () => {
  return (
    <main className="pt-40 max-w-3xl mx-auto px-6">
      <div>
        <h1 className={`${cormorant.className} text-5xl text-center uppercase mb-6`}>
          Privacy Policy
        </h1>

        <p className="my-4 text-sm">
          Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information when you visit our website or make a purchase.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">1. Information We Collect</h2>
        <p className="text-sm mb-4">
          We may collect personal information such as your name, email address, phone number, shipping address, and payment details when you make a purchase or fill out our contact forms.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">2. How We Use Your Information</h2>
        <p className="text-sm mb-4">
          The information we collect is used to process orders, communicate with you about your order, improve our services, and send you promotional offers (if you opt-in). We do not sell or share your personal information with third parties for marketing purposes.
        </p>


        <h2 className="text-xl font-semibold mt-6 mb-2">4. Data Security</h2>
        <p className="text-sm mb-4">
          We implement industry-standard security measures to protect your personal data. However, no method of transmission over the internet or electronic storage is 100% secure.
        </p>

       

        <h2 className="text-xl font-semibold mt-6 mb-2">6. Your Rights</h2>
        <p className="text-sm mb-4">
          You have the right to access, correct, or delete your personal information. You may also opt out of receiving marketing communications at any time by following the unsubscribe instructions provided.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">7. Changes to this Privacy Policy</h2>
        <p className="text-sm mb-4">
          We may update this Privacy Policy from time to time. Any changes will be posted on this page with the updated date. Please review it periodically.
        </p>

        <p className="my-6 text-sm">
          By using our website, you consent to the terms of this Privacy Policy.
        </p>
      </div>
    </main>
  );
};

export default page;
