import React from 'react';

const Shipping = () => {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6">Shipping Policy</h2>
      <p className="text-gray-700 mb-4">
        We work hard to get your orders to you as quickly as possible!
      </p>

      <ul className="space-y-4 text-gray-700">
        <li>
          <strong>Same-Day Dispatch:</strong> Place your order before 4:00 PM
          PST, and we’ll ship it out the same day via a registered courier.
        </li>
        <li>
          <strong>Next-Day Dispatch:</strong> Orders placed after 4:00 PM PST
          will be sent out the next business day.
        </li>
        <li>
          <strong>Weekends & Holidays:</strong> Orders placed on weekends or
          public holidays will be processed on the next working day.
        </li>
        <li>
          <strong>Delivery Time:</strong> Most orders arrive within 3-5 business
          days. However, during peak shopping periods, delivery may take up to 7
          business days.
        </li>
      </ul>

      <p className="text-gray-700 mt-4">
        If you have any questions about your order, feel free to contact us!
      </p>
    </div>
  );
};

export default Shipping;
