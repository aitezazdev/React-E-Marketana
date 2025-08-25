import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const OrderConfirmation = ({ whatsappNumber }) => {
  const location = useLocation();
  const orderDetails = location.state || { subtotal: 0, items: [] };

  const initialMessage = `Order Confirmed!
Subtotal: Rs. ${orderDetails.subtotal}
Items: ${orderDetails.items.map((item) => item.description).join(', ')}
Thank you for your purchase!`;

  const [message, setMessage] = useState(initialMessage);
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Order Confirmation</h1>
      <p className="mb-4">Your order has been placed successfully.</p>
      <form>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows="8"
          className="w-full border border-gray-300 rounded p-3 mb-4"
        />
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center bg-green-500 text-white py-3 rounded font-bold hover:bg-green-600"
        >
          Send Order Details to WhatsApp
        </a>
      </form>
    </div>
  );
};

export default OrderConfirmation;
