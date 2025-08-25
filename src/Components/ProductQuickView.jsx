import React, { useState, useEffect } from 'react';
import { FaStar, FaMinus, FaPlus, FaTimes, FaEye } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice';

const ProductQuickView = ({ product, onClose, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('White');
  const dispatch = useDispatch();

  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  
  const minSwipeDistance = 50;

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
  
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientY);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientY);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isSwipeDown = distance < -minSwipeDistance;
    if (isSwipeDown) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/30 z-40 flex items-end md:items-center justify-center"
      onClick={handleBackgroundClick}
    >
      <div 
        className="bg-white w-full md:max-w-3xl rounded-t-lg md:rounded-lg overflow-y-auto max-h-[70vh] md:max-h-[85vh] relative"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className="h-1 w-16 bg-gray-300 rounded-full mx-auto mt-2 mb-1 md:hidden"></div>
        
        <button
          className="absolute top-2 left-2 text-gray-600 hover:text-black text-xl z-10 md:hidden"
          onClick={onClose}
        >
          <FaTimes />
        </button>
        
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-black text-2xl z-10 hidden md:block"
          onClick={onClose}
        >
          <FaTimes />
        </button>
        
        <div className="p-3 md:p-8">
          <div className="flex flex-col md:flex-row gap-3 md:gap-8">
            <div className="flex md:block gap-2 md:gap-0">
              <div className="w-1/3 md:w-full bg-gray-100 rounded-lg relative flex-shrink-0">
                {product.discount && (
                  <div className="absolute top-1 left-1 md:top-2 md:left-2 bg-red-500 text-white px-1 py-0.5 md:px-2 md:py-1 rounded text-xs md:text-sm">
                    {product.discount}
                  </div>
                )}
                <img
                  src={product.image}
                  alt={product.description}
                  className="w-full h-auto object-cover rounded-lg"
                />
              </div>
              
              <div className="w-2/3 md:hidden">
                <h1 className="text-base font-bold mb-1 line-clamp-2">
                  {product.description.toUpperCase()}
                </h1>
                <div className="flex items-center mb-0.5">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="text-xs" />
                    ))}
                  </div>
                  <span className="ml-1 text-xs">{product.stars || 0} Reviews</span>
                </div>
                <div className="price-section">
                  <span className="line-through text-gray-500 text-xs">
                    {formatPrice(product.originalPrice)}
                  </span>
                  <span className="text-red-500 text-base font-bold ml-1">
                    {formatPrice(product.discountedPrice)}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="w-full md:w-1/2 hidden md:block">
              <h1 className="text-3xl font-bold mb-4">
                {product.description.toUpperCase()}
              </h1>
              <div className="flex items-center mb-2">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="text-xl" />
                  ))}
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
            </div>
            
            <div className="w-full md:w-1/2">
              {/* Hot deal notice - mobile only */}
              <div className="flex items-center text-red-500 mb-1.5 md:hidden text-xs">
                <span>Hot Deal: 5 sold in last 16h</span>
              </div>
              
              <div className="variants mb-2 md:mb-4">
                <p className="font-medium mb-1 md:mb-2 text-xs md:text-base">Variants:</p>
                <div className="flex gap-2">
                  <button
                    className={`border-2 ${
                      selectedColor === 'White'
                        ? 'border-black'
                        : 'border-gray-300'
                    } px-3 md:px-6 py-0.5 md:py-2 text-xs md:text-base`}
                    onClick={() => setSelectedColor('White')}
                  >
                    White
                  </button>
                  <button
                    className={`border-2 ${
                      selectedColor === 'Black'
                        ? 'border-black'
                        : 'border-gray-300'
                    } px-3 md:px-6 py-0.5 md:py-2 text-xs md:text-base`}
                    onClick={() => setSelectedColor('Black')}
                  >
                    Black
                  </button>
                </div>
              </div>
              
              <div className="buttons mb-2 md:mb-4">
                <button
                  className="w-full bg-black text-white py-1.5 md:py-2.5 text-sm md:text-lg font-bold rounded-sm"
                  onClick={handleAdd}
                >
                  ADD TO CART
                </button>
              </div>
              
              <div className="viewers flex items-center text-xs md:text-sm">
                <FaEye className="mr-1 md:mr-2 text-xs md:text-base" />
                <span className="hidden md:inline">112 customers are viewing this product</span>
                <span className="md:hidden">112 viewing now</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductQuickView;