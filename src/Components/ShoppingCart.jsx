import React, { useEffect } from 'react';
import { FaTimes, FaPlus, FaMinus } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import {
  updateQuantity,
  removeFromCart as removeItemAction,
} from '../store/slices/cartSlice';
import { useNavigate } from 'react-router-dom';

function ShoppingCart({ showCart, setShowCart, cartItems }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = showCart ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showCart]);

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const subtotal = cartItems.reduce((sum, item) => {
    const price =
      typeof item.discountedPrice === 'number'
        ? item.discountedPrice
        : parseFloat(String(item.discountedPrice).replace(/[^\d.]/g, ''));
    return sum + price * item.quantity;
  }, 0);

  const increaseQuantity = (id, currentQuantity) => {
    dispatch(updateQuantity({ id, quantity: currentQuantity + 1 }));
  };

  const decreaseQuantity = (id, currentQuantity) => {
    if (currentQuantity > 1) {
      dispatch(updateQuantity({ id, quantity: currentQuantity - 1 }));
    } else {
      dispatch(removeItemAction({ id, removeAll: true }));
    }
  };

  const handleRemoveItem = (id) => {
    dispatch(removeItemAction({ id, removeAll: true }));
  };

  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowCart(false);
    }
  };

  const handleCartBtnClick = () => {
    setShowCart(false);
    navigate('/cart');
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full w-full bg-black/30 z-60 flex justify-end cursor-pointer transition-opacity duration-700 ease-in-out ${showCart ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      onClick={handleBackgroundClick}
    >
      <div
        className={`bg-white w-3/4 sm:w-4/5 md:w-96 h-full shadow-lg overflow-y-auto transition-transform duration-700 ease-out cursor-default ${showCart ? 'translate-x-0' : 'translate-x-full'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 sm:p-6">
          <div className="flex justify-between items-center mb-4 sm:mb-6">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold">Shopping Cart</h1>
              <span className="text-sm">{totalItems} items</span>
            </div>
            <button
              className="text-gray-600 hover:text-black text-xl sm:text-2xl"
              onClick={() => setShowCart(false)}
            >
              <FaTimes />
            </button>
          </div>
          <div className="space-y-4 max-h-60 sm:max-h-72 overflow-y-auto mb-4 sm:mb-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center border-b pb-3 sm:pb-4"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 mr-3 sm:mr-4 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.description}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xs sm:text-sm truncate">
                    {item.description}
                  </h3>
                  <div className="flex items-center mt-1">
                    <span className="text-red-500 font-bold text-xs sm:text-sm mr-2">
                      Rs.{item.discountedPrice}
                    </span>
                    <span className="line-through text-xs text-gray-500">
                      Rs.{item.originalPrice}
                    </span>
                  </div>
                  <div className="flex items-center mt-2">
                    <button
                      className="border p-1 sm:px-2 sm:py-1 text-sm"
                      onClick={() => decreaseQuantity(item.id, item.quantity)}
                    >
                      <FaMinus size={12} />
                    </button>
                    <span className="mx-2 text-sm">{item.quantity}</span>
                    <button
                      className="border p-1 sm:px-2 sm:py-1 text-sm"
                      onClick={() => increaseQuantity(item.id, item.quantity)}
                    >
                      <FaPlus size={12} />
                    </button>
                  </div>
                </div>
                <button
                  className="ml-2 text-gray-500 hover:text-red-500"
                  onClick={() => handleRemoveItem(item.id)}
                >
                  <FaTimes />
                </button>
              </div>
            ))}
            {cartItems.length === 0 && (
              <div className="py-6 sm:py-8 text-center">
                <p className="text-gray-500 text-sm">Your cart is empty</p>
              </div>
            )}
          </div>
          {cartItems.length > 0 && (
            <div className="border-t pt-3 sm:pt-4 mb-4 sm:mb-6">
              <div className="flex justify-between mb-2">
                <h2 className="font-medium text-sm sm:text-base">Sub Total:</h2>
                <h2 className="text-sm sm:text-base">
                  Rs.{subtotal.toFixed(2)}
                </h2>
              </div>
              <div className="flex justify-between mb-3 sm:mb-4">
                <h2 className="font-bold text-sm sm:text-base">Total:</h2>
                <h2 className="font-bold text-sm sm:text-base">
                  Rs.{subtotal.toFixed(2)}
                </h2>
              </div>
              <span className="text-xs text-gray-500 block mb-4 sm:mb-6">
                Tax included and shipping calculated at checkout
              </span>
            </div>
          )}
          <div className="space-y-2 sm:space-y-3">
            <button
              onClick={() => navigate('/checkout')}
              className="w-full bg-black text-white py-2 sm:py-3 px-4 rounded-md hover:bg-gray-800 text-sm sm:text-base"
              disabled={cartItems.length === 0}
            >
              Checkout
            </button>
            <button
              className="w-full border border-black text-black py-2 sm:py-3 px-4 rounded-md hover:bg-gray-100 text-sm sm:text-base"
              onClick={handleCartBtnClick}
            >
              View Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;
