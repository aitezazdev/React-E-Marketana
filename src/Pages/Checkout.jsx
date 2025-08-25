import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { FaCircleInfo } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [saveInfo, setSaveInfo] = useState(false);
  const [billingOption, setBillingOption] = useState('same');

  const cart = useSelector((state) => state.cart.cartProducts);
  const subtotal = cart.reduce(
    (acc, item) => acc + item.discountedPrice * item.quantity,
    0
  );

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (activeStep < 3) {
      setActiveStep(activeStep + 1);
    } else {
      const orderDetails = {
        subtotal,
        items: cart,
      };
      navigate('/confirmation', { state: orderDetails });
    }
  };

  return (
    <div className="max-w-5xl w-full mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <form onSubmit={handleSubmit}>
            {activeStep === 1 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-6">Contact</h2>
                <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
                  <div className="w-full">
                    <label htmlFor="email" className="sr-only">
                      Email or phone number
                    </label>
                    <input
                      type="text"
                      id="email"
                      placeholder="Email or phone number"
                      className="w-full border border-gray-300 rounded p-3"
                      required
                    />
                  </div>
                </div>
                <div className="mb-8">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="w-4 h-4 mr-2"
                      checked={saveInfo}
                      onChange={() => setSaveInfo(!saveInfo)}
                    />
                    <span>Email me with news and offers</span>
                  </label>
                </div>
                <h2 className="text-2xl font-bold mb-6">Delivery</h2>
                <div className="mb-4">
                  <label className="block mb-2">Country/Region</label>
                  <select className="w-full border border-gray-300 rounded p-3 appearance-none">
                    <option>Pakistan</option>
                  </select>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="firstName" className="sr-only">
                      First name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      placeholder="First name"
                      className="w-full border border-gray-300 rounded p-3"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="sr-only">
                      Last name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      placeholder="Last name"
                      className="w-full border border-gray-300 rounded p-3"
                      required
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label htmlFor="address" className="sr-only">
                    Full Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    placeholder="Full Address"
                    className="w-full border border-gray-300 rounded p-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="city" className="sr-only">
                      City name
                    </label>
                    <input
                      type="text"
                      id="city"
                      placeholder="City name"
                      className="w-full border border-gray-300 rounded p-3"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="postalCode" className="sr-only">
                      Postal code (optional)
                    </label>
                    <input
                      type="text"
                      id="postalCode"
                      placeholder="Postal code (optional)"
                      className="w-full border border-gray-300 rounded p-3"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label htmlFor="phone" className="sr-only">
                    Phone no
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      id="phone"
                      placeholder="Phone no"
                      className="w-full border border-gray-300 rounded p-3"
                      required
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <FaCircleInfo />
                    </span>
                  </div>
                </div>
                <div className="mt-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="w-4 h-4 mr-2"
                      checked={saveInfo}
                      onChange={() => setSaveInfo(!saveInfo)}
                    />
                    <span>Save this information for next time</span>
                  </label>
                </div>
              </div>
            )}
            {activeStep === 2 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-6">Shipping method</h2>
                <div className="mb-8">
                  <div className="border border-gray-300 rounded bg-blue-50 p-4 flex justify-between items-center">
                    <span>Standard</span>
                    <span className="font-bold">FREE</span>
                  </div>
                </div>
                <h2 className="text-2xl font-bold mb-4">Payment</h2>
                <p className="text-gray-600 mb-6">
                  All transactions are secure and encrypted.
                </p>
                <div className="mb-8">
                  <div className="border border-gray-300 rounded p-4">
                    <label className="block mb-2">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        defaultChecked
                        className="mr-2"
                      />
                      Cash on Delivery (COD)
                    </label>
                  </div>
                  <div className="bg-gray-100 p-4 text-center">
                    Cash On Delivery (COD)
                  </div>
                </div>
                <h2 className="text-2xl font-bold mb-6">Billing address</h2>
                <div className="mb-4">
                  <div className="border border-gray-300 rounded bg-blue-50 p-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="billingAddress"
                        value="same"
                        checked={billingOption === 'same'}
                        onChange={() => setBillingOption('same')}
                        className="mr-2"
                      />
                      Same as shipping address
                    </label>
                  </div>
                </div>
              </div>
            )}
            {activeStep === 3 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-6">
                  Review & Complete Order
                </h2>
                <p className="mb-4">
                  Review your details and ensure everything is correct before
                  completing your order.
                </p>
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-[#1773b0] text-white py-4 rounded font-medium hover:bg-[#1163ae]"
            >
              {activeStep === 3
                ? 'Complete order'
                : activeStep === 2
                  ? 'Continue to Payment'
                  : 'Continue to Shipping'}
            </button>
          </form>
        </div>
        <div className="bg-gray-50 p-6 rounded">
          <div
            className={`mb-6 ${cart.length > 2 ? 'overflow-y-auto' : ''}`}
            style={
              cart.length > 2 ? { maxHeight: '200px', paddingTop: '10px' } : {}
            }
          >
            {cart.length === 0 ? (
              <p className="text-gray-500">Your cart is empty</p>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="flex items-start mb-4">
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.description}
                      className="w-16 h-16 object-cover rounded border"
                    />
                    <span className="absolute -top-2 -right-2 bg-gray-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="ml-4 flex-1">
                    <p className="text-sm">{item.description}</p>
                  </div>
                  <div className="ml-2 text-right">
                    <p className="font-medium">
                      Rs{' '}
                      {(item.quantity * item.discountedPrice).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="mb-6">
            <div className="flex">
              <input
                type="text"
                placeholder="Discount code"
                className="flex-1 border border-gray-300 rounded-l p-3"
              />
              <button className="bg-gray-200 text-gray-600 px-4 py-3 rounded-r border border-l-0 border-gray-300">
                Apply
              </button>
            </div>
          </div>
          <div className="border-t pt-4">
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>Rs {subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between mb-2">
              <div className="flex items-center">
                <span>Shipping</span>
                <FaCircleInfo className="ml-2 text-gray-400" />
              </div>
              <span>FREE</span>
            </div>
            <div className="flex justify-between font-bold text-lg mt-4">
              <span>Total</span>
              <div className="text-right">
                <div className="text-sm text-gray-500 font-normal">PKR</div>
                <div>Rs {subtotal.toLocaleString()}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
