// components/Faq.tsx
'use client';

import { useState } from 'react';

type FaqItem = {
  question: string;
  answer: string;
};

const faqData: FaqItem[] = [
  {
    question: "What payment methods do you accept?",
    answer: "We accept Cash on Delivery right now only.",
  },
  {
      question: "How do I contact you?",
      answer: "For any questions or complaints, you can contact us on our e-mail: maaz52364@gmail.com Similarly, you can also leave us a message on our Instagram or Facebook page and we will get back to you."
  },
  {
    question: "What happens if I miss the delivery?",
    answer: "Courier Riders are instructed to call or drop a text before making any delivery attempt, however, in case of any failed attempt, please try calling back the courier company for quick delivery. Incase you failed to connect, courier company informs us via email. We will try to contact you again to solve the matter. Eventually, orders make their way back to us if there is no response from the buyer’s end.In case the Buyer seems inappropriate, we ban the buyer from our database, hence no more services for banned customers. ",
  },
  {
    question: "What is your return and refund policy?",
    answer: "We do not offer return and refund policy yet",
  },
  {
    question: "What are the shipping charges?",
    answer: "Standard Shipping charges are Rs. 300 all over Pakistan,  During sale, shipping charges might differ.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-2xl mx-auto p-4 py-40">
      <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
      <div className="space-y-2">
        {faqData.map((item, index) => (
          <div key={index} className="border rounded-md p-3">
            <button
              className="w-full text-left flex justify-between text-sm md:text-base items-center font-medium"
              onClick={() => toggleFaq(index)}
            >
              {item.question}
              <span>{openIndex === index ? '-' : '+'}</span>
            </button>
            {openIndex === index && (
              <p className="mt-2 text-gray-700">{item.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
