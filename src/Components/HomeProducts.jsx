import React, { useState, useEffect } from 'react';
import { FaStar, FaShoppingCart, FaEye } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import ShoppingCart from './ShoppingCart';
import ProductQuickView from './ProductQuickView';
import { addToCart, removeFromCart } from '../store/slices/cartSlice';

function HomeProducts() {
  const projectors = useSelector((state) => state.projectors) || [];
  const cartItems = useSelector((state) => state.cart.cartProducts);
  const [showCart, setShowCart] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();

    window.addEventListener('resize', checkIfMobile);

    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
    setShowCart(true);
  };

  const handleAddToCartFromQuickView = (product, quantity, selectedColor) => {
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
    setShowCart(true);
  };

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart({ id }));
  };

  return (
    <div className="w-full bg-gray-100 py-8 px-4 sm:py-12 sm:px-6 relative">
      <h2 className="text-xl sm:text-2xl text-center pb-6 sm:pb-8 font-bold">
        SHOP BEST SELLERS
      </h2>
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {projectors.map((item, index) => (
          <ProductCard
            key={index}
            item={item}
            index={index}
            handleAddToCart={handleAddToCart}
            onQuickView={() => setQuickViewProduct({ ...item, id: index })}
            isMobile={isMobile}
          />
        ))}
      </div>

      <ShoppingCart
        showCart={showCart}
        setShowCart={setShowCart}
        cartItems={cartItems}
        removeFromCart={handleRemoveFromCart}
      />

      {quickViewProduct && (
        <ProductQuickView
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          onAddToCart={handleAddToCartFromQuickView}
        />
      )}
    </div>
  );
}

function ProductCard({ item, index, handleAddToCart, onQuickView, isMobile }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isEyeHovered, setIsEyeHovered] = useState(false);

  const formatPrice = (price) =>
    `Rs.${price.toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden relative group transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {item.discount && (
        <div className="absolute top-3 left-3 bg-red-600 text-white px-2 py-1 text-xs font-bold rounded-md z-10">
          {item.discount}
        </div>
      )}

      <div
        className={`absolute top-3 right-3 rounded-full bg-white z-10 transition-all duration-300 cursor-pointer ${
          isMobile || isHovered
            ? 'opacity-100 transform translate-x-0'
            : 'opacity-0 transform translate-x-4'
        }`}
        onMouseEnter={() => setIsEyeHovered(true)}
        onMouseLeave={() => setIsEyeHovered(false)}
        onClick={(e) => {
          e.stopPropagation();
          onQuickView();
        }}
      >
        <div className="relative bg-white rounded-full shadow-md p-2">
          {isEyeHovered && !isMobile ? (
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium">Quick view</span>
              <FaEye className="text-black w-3 h-3" />
            </div>
          ) : (
            <FaEye className="text-black w-4 h-4" />
          )}
        </div>
      </div>

      <div className="w-full h-60 sm:h-72 overflow-hidden relative">
        <Link to={`/product/${index + 1}`}>
          <div className="relative w-full h-full">
            <img
              src={item.image}
              alt={item.description || 'Product Image'}
              className={`w-full h-full object-cover object-center absolute top-0 left-0 transition-opacity duration-500 ${
                isHovered && !isMobile ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <img
              src={item.hoverImage || item.image}
              alt={`${item.description || 'Product'} alternate view`}
              className={`absolute top-0 h-full object-cover object-center transition-all duration-500 ${
                isHovered && !isMobile
                  ? 'opacity-100 w-[70%] left-1/2 -translate-x-1/2'
                  : 'opacity-0 w-full left-0'
              }`}
            />
          </div>
        </Link>

        {isMobile ? (
          <div className="absolute bottom-0 left-0 right-0">
            <button
              className="w-full bg-white text-black text-sm font-medium border border-black hover:bg-black hover:text-white py-2 sm:py-3 px-4 flex items-center justify-center gap-2 transition-colors duration-300"
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCart({
                  id: index,
                  description: item.description,
                  image: item.image,
                  discountedPrice: item.discountedPrice,
                  originalPrice: item.originalPrice,
                });
              }}
            >
              <FaShoppingCart className="w-3 h-3 sm:w-4 sm:h-4" />
              Add to Cart
            </button>
          </div>
        ) : (
          <div className="absolute bottom-0 left-0 right-0 transform translate-y-full transition-transform duration-300 group-hover:translate-y-0">
            <button
              className="w-full bg-white text-black text-sm font-medium border border-black hover:bg-black hover:text-white py-3 px-4 flex items-center justify-center gap-2 transition-colors duration-300"
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCart({
                  id: index,
                  description: item.description,
                  image: item.image,
                  discountedPrice: item.discountedPrice,
                  originalPrice: item.originalPrice,
                });
              }}
            >
              <FaShoppingCart className="w-4 h-4" />
              Add to Cart
            </button>
          </div>
        )}
      </div>

      <div className="p-3 sm:p-5">
        <Link to={`/product/${index + 1}`}>
          <h3 className="font-medium mb-2 sm:mb-3 text-center line-clamp-2 h-8 sm:h-10 text-sm sm:text-base">
            {item.description.slice(0, 38) || 'Product Description'}
          </h3>
        </Link>
        <div className="flex items-center mb-2 sm:mb-3 justify-center">
          <div className="flex text-yellow-400">
            <FaStar className="w-3 h-3 sm:w-4 sm:h-4" />
            <FaStar className="w-3 h-3 sm:w-4 sm:h-4" />
            <FaStar className="w-3 h-3 sm:w-4 sm:h-4" />
            <FaStar className="w-3 h-3 sm:w-4 sm:h-4" />
            <FaStar className="w-3 h-3 sm:w-4 sm:h-4" />
          </div>
          <span className="text-gray-500 text-xs ml-2">
            ({item.stars || 0})
          </span>
        </div>
        <div className="mt-2 sm:mt-3 flex items-center gap-2 justify-center">
          <span className="line-through text-xs text-gray-500">
            {formatPrice(item.originalPrice)}
          </span>
          <div className="text-red-600 font-bold text-sm sm:text-base">
            {formatPrice(item.discountedPrice)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeProducts;
