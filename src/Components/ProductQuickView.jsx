import React, { useState, useEffect } from 'react';
import { FaStar, FaMinus, FaPlus, FaTimes, FaEye } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice';

const ProductQuickView = ({ product, onClose, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('White');
  const dispatch = useDispatch();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const formatPrice = (price) =>
    `Rs.${Number(price).toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  const handleDecreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const subtotal = (product.discountedPrice * quantity).toFixed(2);

  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleAdd = () => {
    if (onAddToCart) {
      onAddToCart(product, quantity, selectedColor);
    } else {
      dispatch(
        addToCart({
          id: product.id,
          description: product.description,
          image: product.image,
          discountedPrice: product.discountedPrice,
          originalPrice: product.originalPrice,
          selectedColor,
          quantity,
        })
      );
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/30 z-40 flex mt-14 items-center justify-center"
      onClick={handleBackgroundClick}
    >
      <div className="bg-white w-full max-w-3xl mx-4 rounded-lg overflow-y-auto max-h-full relative">
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-black text-2xl"
          onClick={onClose}
        >
          <FaTimes />
        </button>
        <div className="p-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/2 bg-gray-100 rounded-lg relative">
              {product.discount && (
                <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded">
                  {product.discount}
                </div>
              )}
              <img
                src={product.image}
                alt={product.description}
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>
            <div className="w-full md:w-1/2">
              <h1 className="text-3xl font-bold mb-4">
                {product.description.toUpperCase()}
              </h1>
              <div className="flex items-center mb-2">
                <div className="flex text-yellow-400">
                  <FaStar className="text-xl" />
                  <FaStar className="text-xl" />
                  <FaStar className="text-xl" />
                  <FaStar className="text-xl" />
                  <FaStar className="text-xl" />
                </div>
                <span className="ml-2">{product.stars || 0} Reviews</span>
              </div>
              <div className="flex items-center text-red-500 mb-4">
                <span>Hot Deal: 5 sold in last 16 hours</span>
              </div>
              <div className="price-section mb-4">
                <span className="line-through text-gray-500 text-sm">
                  {formatPrice(product.originalPrice)}
                </span>
                <span className="text-red-500 text-xl font-bold ml-2">
                  {formatPrice(product.discountedPrice)}
                </span>
              </div>
              <div className="variants mb-4">
                <p className="font-medium mb-2">Variants: {selectedColor}</p>
                <div className="flex gap-2">
                  <button
                    className={`border-2 ${
                      selectedColor === 'White'
                        ? 'border-black'
                        : 'border-gray-300'
                    } px-6 py-2`}
                    onClick={() => setSelectedColor('White')}
                  >
                    White
                  </button>
                  <button
                    className={`border-2 ${
                      selectedColor === 'Black'
                        ? 'border-black'
                        : 'border-gray-300'
                    } px-6 py-2`}
                    onClick={() => setSelectedColor('Black')}
                  >
                    Black
                  </button>
                </div>
              </div>
              <div className="buttons space-y-4">
                <button
                  className="w-full bg-black text-white py-2.5 text-lg font-bold"
                  onClick={handleAdd}
                >
                  ADD TO CART
                </button>
              </div>
              <div className="viewers mt-4 flex items-center">
                <FaEye className="mr-2" />
                <span>112 customers are viewing this product</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductQuickView;
