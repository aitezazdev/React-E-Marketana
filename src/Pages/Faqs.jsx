import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const Faqs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: 'How can I contact E-Marketona?',
      answer:
        'You can email us at emarketonaofficiall@gmail.com or message us on WhatsApp at +92 312 6924799. Our team is always ready to assist you!',
    },
    {
      question: 'Do you ship all over Pakistan?',
      answer: 'Yes, we deliver to every city across Pakistan!',
    },
    {
      question: 'Where do you ship from?',
      answer: 'All orders are shipped from our facility in Islamabad.',
    },
    {
      question: 'Can I change or cancel my order?',
      answer:
        'We process orders quickly! Any changes or cancellations must be requested within 12 hours. Requests after this time cannot be accommodated.',
    },
    {
      question: 'What payment methods do you accept?',
      answer:
        'We accept payments via Bank Transfer (IBAN), Easypaisa, and Cash on Delivery (COD).',
    },
  ];

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6">FAQs</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b pb-3">
            <button
              className="w-full flex justify-between items-center py-3 text-left text-lg font-medium"
              onClick={() => toggleFaq(index)}
            >
              {faq.question}
              {openIndex === index ? (
                <Minus className="h-5 w-5 text-gray-500" />
              ) : (
                <Plus className="h-5 w-5 text-gray-500" />
              )}
            </button>
            {openIndex === index && (
              <p className="text-gray-600 mt-2 text-base">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faqs;
