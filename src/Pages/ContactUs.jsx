import React from 'react';

const ContactUs = () => {
  return (
    <div className="max-w-2xl mx-auto p-6 text-center">
      <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
      <p className="text-lg text-gray-700">
        Have any questions? Reach out to us!
      </p>
      <div className="mt-4 space-y-2">
        <p className="text-gray-800 font-medium">
          📧 Email:{' '}
          <a
            href="mailto:emarkrtanaofficiall@gmail.com"
            target="_blank"
            className="text-purple-600 hover:underline"
          >
            emarkrtanaofficiall@gmail.com
          </a>
        </p>
        <p className="text-gray-800 font-medium">
          💬 WhatsApp:{' '}
          <a
            href="https://wa.me/923126924799"
            target="_blank"
            className="text-purple-600 hover:underline"
          >
            +92 312 6924799
          </a>
        </p>
      </div>
      <p className="text-sm text-gray-600 mt-3">
        We typically respond within 24 hours.
      </p>
    </div>
  );
};

export default ContactUs;
