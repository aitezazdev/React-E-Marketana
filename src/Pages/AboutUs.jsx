import React from 'react';

const AboutUs = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 pb-20 text-center">
      <h1 className="text-3xl font-bold mb-4">About E-Marketana</h1>
      <p className="text-lg text-gray-700 mb-6">
        Welcome to E-Marketana – your go-to online store for everything you
        need, delivered right to your doorstep anywhere in Pakistan.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
        <div className="bg-gray-100 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Wide Selection</h2>
          <p>
            From everyday essentials to specialty products, we’ve got it all
            under one roof.
          </p>
        </div>
        <div className="bg-gray-100 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Shop with Ease</h2>
          <p>Order from home and enjoy FREE nationwide delivery.</p>
        </div>
        <div className="bg-gray-100 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Quality You Can Trust</h2>
          <p>We only work with reliable brands and trusted vendors.</p>
        </div>
        <div className="bg-gray-100 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Best Prices</h2>
          <p>Get great deals without compromising on quality.</p>
        </div>
      </div>
      <p className="mt-6 text-gray-700">
        At E-Marketana, we’re dedicated to making your online shopping
        experience smooth and enjoyable. We’re always adding new products and
        improving our services to better serve you.
      </p>
      <p className="mt-4 text-lg font-semibold">
        Start shopping today and experience the best of online shopping in
        Pakistan!
      </p>
    </div>
  );
};

export default AboutUs;
