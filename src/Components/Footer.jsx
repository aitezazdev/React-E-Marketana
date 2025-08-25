import React, { useState } from 'react';
import { Facebook, Instagram, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Signed up with email: ${email}`);
    setEmail('');
  };

  return (
    <footer className="bg-white border-t border-gray-200 pt-10 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="col-span-1">
            <div className="mb-6">
              <p>E-Marketana</p>
            </div>
            <div className="flex space-x-2 mb-6">
              <a
                href="#"
                className="bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 transition"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                className="bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 transition"
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>

          <div className="col-span-1">
            <h3 className="font-bold text-lg mb-4">QUICK LINKS</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to={'/'} className="text-gray-700 hover:text-black">
                  HOME
                </Link>
              </li>
              <li>
                <Link
                  to={'/projectors'}
                  className="text-gray-700 hover:text-black"
                >
                  PROJECTORS
                </Link>
              </li>
              <li>
                <Link
                  to={'/about-us'}
                  className="text-gray-700 hover:text-black"
                >
                  aBOUT US
                </Link>
              </li>
              <li>
                <Link
                  to={'/support/faqs'}
                  className="text-gray-700 hover:text-black"
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  to={'/support/contact'}
                  className="text-gray-700 hover:text-black"
                >
                  CONTACT US
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1 lg:col-span-2">
            <h3 className="font-bold text-lg mb-4">NEWSLETTER SIGN UP</h3>
            <p className="mb-4">
              Sign up for exclusive updates, new arrivals & insider only
              discounts
            </p>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col md:flex-row gap-2"
            >
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-grow px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                className="bg-gray-800 text-white px-6 py-2 hover:bg-gray-700 transition"
              >
                SUBMIT
              </button>
            </form>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-bold text-lg mb-3">PHONE NUMBER</h3>
            <a
              href="tel:+923126924799"
              className="text-gray-700 hover:text-black"
            >
              +923126924799
            </a>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-3">ADDRESS</h3>
            <p className="text-gray-700">board bazar, Peshawar Pakistan.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
