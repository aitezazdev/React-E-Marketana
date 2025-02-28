import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa6';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../store/slices/cartSlice';

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartProducts } = useSelector((state) => state.cart);

  const handleIncreaseQuantity = (product) => {
    dispatch(addToCart(product));
  };

  const handleDecreaseQuantity = (product) => {
    dispatch(removeFromCart({ id: product.id }));
  };

  const handleRemoveItem = (product) => {
    dispatch(removeFromCart({ id: product.id, removeAll: true }));
  };

  const subtotal = cartProducts.reduce(
    (total, item) => total + item.discountedPrice * item.quantity,
    0
  );

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-4 sm:py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8">
        <div className="lg:col-span-2 bg-gray-50 rounded-lg p-3 sm:p-6">
          <div className="hidden sm:grid grid-cols-4 pb-4 border-b text-gray-800 font-medium">
            <div className="col-span-1">PRODUCT</div>
            <div className="col-span-1 text-center">PRICE</div>
            <div className="col-span-1 text-center">QUANTITY</div>
            <div className="col-span-1 text-center">TOTAL</div>
          </div>

          {cartProducts.length === 0 ? (
            <div className="py-8 text-center">
              <p className="text-gray-500">Your cart is empty</p>
              <button
                onClick={() => navigate('/')}
                className="mt-4 bg-gray-900 text-white px-6 py-2 rounded"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            cartProducts.map((item) => (
              <div key={item.id} className="py-4 sm:py-6 border-b">
                <div className="sm:hidden">
                  <div className="flex items-start gap-3 mb-3">
                    <img
                      src={item.image || '/api/placeholder/80/80'}
                      alt={item.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="text-sm font-medium">
                        {item.description}
                      </h3>
                      <div className="flex justify-between items-center mt-1">
                        <div>
                          {item.originalPrice && (
                            <p className="text-xs text-gray-400 line-through">
                              Rs.{item.originalPrice.toLocaleString()}
                            </p>
                          )}
                          <p className="font-medium text-sm">
                            Rs.{item.discountedPrice.toLocaleString()}
                          </p>
                        </div>
                        <button
                          className="text-gray-500 hover:text-red-600"
                          onClick={() => handleRemoveItem(item)}
                        >
                          <FaTrash size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex border rounded-md">
                      <button
                        className="px-2 py-1 text-sm font-medium border-r"
                        onClick={() => handleDecreaseQuantity(item)}
                      >
                        −
                      </button>
                      <span className="px-3 py-1 text-center min-w-[32px] text-sm">
                        {item.quantity}
                      </span>
                      <button
                        className="px-2 py-1 text-sm font-medium border-l"
                        onClick={() => handleIncreaseQuantity(item)}
                      >
                        +
                      </button>
                    </div>
                    <p className="font-medium text-sm">
                      Total: Rs.
                      {(item.discountedPrice * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="hidden sm:grid grid-cols-4 items-center">
                  <div className="col-span-1 flex gap-4">
                    <img
                      src={item.image || '/api/placeholder/120/120'}
                      alt={item.title}
                      className="w-16 h-16 sm:w-20 sm:h-20 object-cover"
                    />
                    <div className="flex flex-col justify-center">
                      <h3 className="text-sm font-medium">
                        {item.description}
                      </h3>
                    </div>
                  </div>

                  <div className="col-span-1 text-center">
                    {item.originalPrice && (
                      <p className="text-gray-400 line-through">
                        Rs.{item.originalPrice.toLocaleString()}
                      </p>
                    )}
                    <p className="font-medium">
                      Rs.{item.discountedPrice.toLocaleString()}
                    </p>
                  </div>

                  <div className="col-span-1 flex justify-center">
                    <div className="flex border rounded-md">
                      <button
                        className="px-3 py-1 text-base font-medium border-r"
                        onClick={() => handleDecreaseQuantity(item)}
                      >
                        −
                      </button>
                      <span className="px-4 py-1 text-center min-w-[40px]">
                        {item.quantity}
                      </span>
                      <button
                        className="px-3 py-1 text-base font-medium border-l"
                        onClick={() => handleIncreaseQuantity(item)}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="col-span-1 flex justify-between items-center">
                    <p className="font-medium text-center w-full">
                      Rs.
                      {(item.discountedPrice * item.quantity).toLocaleString()}
                    </p>
                    <button
                      className="text-gray-500 hover:text-red-600"
                      onClick={() => handleRemoveItem(item)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}

          <div className="mt-6 sm:mt-8 flex items-center gap-2">
            <div className="w-5 h-5 bg-gray-800 rounded-full flex items-center justify-center text-white text-xs">
              ✓
            </div>
            <span className="text-gray-600 text-xs sm:text-sm">
              Secure Shopping Guarantee
            </span>
          </div>
        </div>

        {cartProducts.length > 0 && (
          <div className="bg-gray-50 rounded-lg p-4 sm:p-6 mt-4 lg:mt-0">
            <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">
              ORDER SUMMARY
            </h2>
            <div className="border-b pb-4 mb-4">
              <div className="flex justify-between text-gray-800 mb-4">
                <p>Subtotal</p>
                <p className="font-bold">Rs.{subtotal.toLocaleString()}</p>
              </div>
            </div>
            <div className="mb-4 sm:mb-6">
              <p className="text-gray-800 mb-2">Coupon Code</p>
              <input
                type="text"
                placeholder="Enter Coupon Code"
                className="w-full border p-2 sm:p-3 mb-2 text-sm"
              />
              <p className="text-gray-500 text-xs sm:text-sm">
                Coupon code will be applied on the checkout page
              </p>
            </div>
            <div className="flex justify-between text-gray-800 font-bold text-base sm:text-lg mb-3 sm:mb-4">
              <p>TOTAL:</p>
              <p>Rs.{subtotal.toLocaleString()}</p>
            </div>
            <p className="text-gray-500 text-xs sm:text-sm mb-4 sm:mb-6">
              Tax included and shipping calculated at checkout
            </p>
            <button
              onClick={() => navigate('/checkout')}
              className="w-full bg-gray-900 text-white py-2 sm:py-3 text-sm sm:text-base font-medium mb-3 sm:mb-4"
              disabled={cartProducts.length === 0}
            >
              PROCEED TO CHECKOUT
            </button>
            <button
              onClick={() => navigate('/')}
              className="w-full border border-gray-900 text-gray-900 py-2 sm:py-3 text-sm sm:text-base font-medium"
            >
              CONTINUE SHOPPING
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
