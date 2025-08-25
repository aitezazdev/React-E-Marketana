import React, { useState, useEffect } from 'react';
import { FaStar, FaEye, FaShoppingCart } from 'react-icons/fa';
import { Grid3x3, Grid2x2, List } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import ShoppingCart from './ShoppingCart';
import ProductQuickView from './ProductQuickView';
import { addToCart, removeFromCart } from '../store/slices/cartSlice';

function ProjectorsAndLights() {
  const projectors = useSelector((state) => state.projectors);
  const cartItems = useSelector((state) => state.cart.cartProducts);
  const [showCart, setShowCart] = useState(false);
  const [viewMode, setViewMode] = useState(3);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [sortBy, setSortBy] = useState('Featured');
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

  useEffect(() => {
    if (isMobile && viewMode !== 1) {
      setViewMode(1);
    }
  }, [isMobile, viewMode]);

  const formatPrice = (price) =>
    `Rs.${price.toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
    setShowCart(true);
  };

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart({ id }));
  };

  const getWidthClass = () => {
    if (isMobile) return 'w-full';

    switch (viewMode) {
      case 1:
        return 'w-full';
      case 2:
        return 'w-[48%]';
      case 3:
      default:
        return 'w-full sm:w-[48%] lg:w-[31%] xl:w-[23%]';
    }
  };

  const sortedProjectors = [...projectors];
  if (sortBy === 'A-Z') {
    sortedProjectors.sort((a, b) => a.description.localeCompare(b.description));
  } else if (sortBy === 'Z-A') {
    sortedProjectors.sort((a, b) => b.description.localeCompare(a.description));
  } else if (sortBy === 'Price: low to high') {
    sortedProjectors.sort(
      (a, b) =>
        (a.discountedPrice || a.originalPrice) -
        (b.discountedPrice || b.originalPrice)
    );
  } else if (sortBy === 'Price: high to low') {
    sortedProjectors.sort(
      (a, b) =>
        (b.discountedPrice || b.originalPrice) -
        (a.discountedPrice || a.originalPrice)
    );
  }

  const displayedProjectors = sortedProjectors.slice(0, itemsPerPage);

  return (
    <div className="w-full h-fit p-3 sm:p-6 bg-gray-100 mt-8 sm:mt-12 relative">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 sm:mb-6 bg-white p-3 sm:p-4 rounded-md shadow-md">
        <div className="hidden md:flex items-center space-x-4">
          <span className="font-medium">View:</span>
          <div className="flex space-x-1">
            <button
              className={`px-2 py-1 sm:px-3 sm:py-2 border border-gray-300 rounded-l-md transition-colors ${viewMode === 3 ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              onClick={() => setViewMode(3)}
              title="Three items per row"
            >
              <Grid3x3 size={18} />
            </button>
            <button
              className={`px-2 py-1 sm:px-3 sm:py-2 border-t border-b border-gray-300 transition-colors ${viewMode === 2 ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              onClick={() => setViewMode(2)}
              title="Two items per row"
            >
              <Grid2x2 size={18} />
            </button>
            <button
              className={`px-2 py-1 sm:px-3 sm:py-2 border border-gray-300 rounded-r-md transition-colors ${viewMode === 1 ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              onClick={() => setViewMode(1)}
              title="One item per row"
            >
              <List size={18} />
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row w-full md:w-auto items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-6">
          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <label className="font-medium text-sm sm:text-base">
              Items per page:
            </label>
            <select
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              className="p-1 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
              <option value={40}>40</option>
              <option value={50}>50</option>
            </select>
          </div>
          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <label className="font-medium text-sm sm:text-base">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="p-1 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            >
              <option value="Featured">Featured</option>
              <option value="A-Z">A-Z</option>
              <option value="Z-A">Z-A</option>
              <option value="Price: low to high">Price: low to high</option>
              <option value="Price: high to low">Price: high to low</option>
            </select>
          </div>
        </div>
      </div>

      <div className="w-full h-fit flex flex-wrap gap-3 sm:gap-5 justify-center">
        {displayedProjectors.map((item, index) => {
          const [isHovered, setIsHovered] = useState(false);
          const [isEyeHovered, setIsEyeHovered] = useState(false);

          const productId = item.id || index + 1;

          const handleQuickView = () => {
            setQuickViewProduct(item);
          };

          if (viewMode === 1 || isMobile) {
            return (
              <div
                key={index}
                className="w-full bg-white rounded-lg shadow-lg overflow-hidden relative group flex flex-col md:flex-row"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <div className="w-full md:w-1/3 relative overflow-hidden">
                  <div className="absolute top-1 left-1 bg-red-600 text-white px-2 py-1 text-xs sm:text-sm font-bold rounded-md z-10">
                    {item.discount}
                  </div>

                  <div
                    className={`absolute top-3 right-3 rounded-full bg-white z-10 transition-all duration-300 ${
                      isMobile || isHovered
                        ? 'opacity-100 transform translate-x-0'
                        : 'opacity-0 transform translate-x-4'
                    }`}
                    onMouseEnter={() => setIsEyeHovered(true)}
                    onMouseLeave={() => setIsEyeHovered(false)}
                    onClick={handleQuickView}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="relative bg-white rounded-full shadow-md p-2">
                      {isEyeHovered && !isMobile ? (
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-medium">
                            Quick view
                          </span>
                          <FaEye className="text-black w-3 h-3" />
                        </div>
                      ) : (
                        <FaEye className="text-black w-4 h-4" />
                      )}
                    </div>
                  </div>

                  <Link to={`/product/${productId}`}>
                    <div className="relative h-60 sm:h-80 w-full">
                      <img
                        src={item.image}
                        alt="Product"
                        className={`w-full h-full object-cover transition-opacity duration-500 ${isHovered && !isMobile ? 'opacity-0' : 'opacity-100'}`}
                      />
                      <img
                        src={item.hoverImage || item.image}
                        alt="Product Hover"
                        className={`w-full h-full absolute top-0 left-0 object-cover transition-opacity duration-500 ${isHovered && !isMobile ? 'opacity-100' : 'opacity-0'}`}
                      />
                    </div>
                  </Link>
                </div>

                <div className="w-full md:w-2/3 p-4 sm:p-6 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base sm:text-xl font-medium mb-2 sm:mb-4 text-center md:text-left">
                      {item.description}
                    </h3>
                    <div className="flex items-center justify-center md:justify-start mb-2 sm:mb-4">
                      <div className="flex text-yellow-400">
                        <FaStar className="w-4 h-4 sm:w-5 sm:h-5" />
                        <FaStar className="w-4 h-4 sm:w-5 sm:h-5" />
                        <FaStar className="w-4 h-4 sm:w-5 sm:h-5" />
                        <FaStar className="w-4 h-4 sm:w-5 sm:h-5" />
                        <FaStar className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <span className="text-gray-500 text-xs sm:text-sm ml-2">
                        ({item.stars})
                      </span>
                    </div>
                    <p className="text-gray-600 mb-2 sm:mb-4 text-center md:text-left text-sm sm:text-base">
                      Experience superior quality with our premium projector
                      designed for immersive viewing.
                    </p>
                    <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 justify-center md:justify-start">
                      <span className="line-through text-sm sm:text-base text-gray-500">
                        {formatPrice(item.originalPrice)}
                      </span>
                      <div className="text-red-500 text-lg sm:text-xl font-bold">
                        {formatPrice(item.discountedPrice)}
                      </div>
                      <div className="bg-red-100 text-red-800 text-xs sm:text-sm px-2 py-1 rounded">
                        {item.discount}
                      </div>
                    </div>
                  </div>

                  <div className="mt-auto">
                    <button
                      className="w-full md:w-48 bg-white text-black text-sm font-medium border border-black hover:bg-black hover:text-white py-2 sm:py-3 px-4 flex items-center justify-center gap-2 transition-colors duration-300"
                      onClick={() =>
                        handleAddToCart({
                          id: productId,
                          description: item.description,
                          image: item.image,
                          discountedPrice: item.discountedPrice,
                          originalPrice: item.originalPrice,
                        })
                      }
                    >
                      <FaShoppingCart className="w-3 h-3 sm:w-4 sm:h-4" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            );
          }

          return (
            <div
              key={index}
              className={`${getWidthClass()} bg-white rounded-lg shadow-lg overflow-hidden relative group`}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="absolute top-1 left-1 bg-red-600 text-white px-2 py-1 text-xs sm:text-sm font-bold rounded-md z-10">
                {item.discount}
              </div>

              <div
                className={`absolute top-3 right-3 rounded-full bg-white z-10 transition-all duration-300 ${
                  isHovered
                    ? 'opacity-100 transform translate-x-0'
                    : 'opacity-0 transform translate-x-4'
                }`}
                onMouseEnter={() => setIsEyeHovered(true)}
                onMouseLeave={() => setIsEyeHovered(false)}
                onClick={handleQuickView}
                style={{ cursor: 'pointer' }}
              >
                <div className="relative bg-white rounded-full shadow-md p-2">
                  {isEyeHovered ? (
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium">Quick view</span>
                      <FaEye className="text-black w-3 h-3" />
                    </div>
                  ) : (
                    <FaEye className="text-black w-4 h-4" />
                  )}
                </div>
              </div>

              <div className="w-full h-72 sm:h-96 overflow-hidden relative">
                <Link to={`/product/${productId}`}>
                  <div className="relative w-full h-full">
                    <img
                      src={item.image}
                      alt="Product"
                      className={`w-full h-full absolute top-0 left-0 object-cover transition-opacity duration-500 ${isHovered ? 'opacity-0' : 'opacity-100'}`}
                    />
                    <img
                      src={item.hoverImage || item.image}
                      alt="Product Hover"
                      className={`w-full h-full absolute top-0 left-0 object-cover transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
                    />
                  </div>
                </Link>
                <div className="absolute bottom-0 left-0 right-0 transform translate-y-full transition-transform duration-300 group-hover:translate-y-0">
                  <button
                    className="w-full bg-white text-black text-sm font-medium border border-black hover:bg-black hover:text-white py-3 px-4 flex items-center justify-center gap-2 transition-colors duration-300"
                    onClick={() =>
                      handleAddToCart({
                        id: productId,
                        description: item.description,
                        image: item.image,
                        discountedPrice: item.discountedPrice,
                        originalPrice: item.originalPrice,
                      })
                    }
                  >
                    <FaShoppingCart className="w-4 h-4" />
                    Add to Cart
                  </button>
                </div>
              </div>

              <div className="p-4 sm:p-6">
                <h3 className="text-sm sm:text-md mb-2 text-center">
                  {item.description}
                </h3>
                <div className="flex items-center justify-center mb-2 sm:mb-3">
                  <div className="flex text-yellow-400">
                    <FaStar className="w-4 h-4 sm:w-5 sm:h-5" />
                    <FaStar className="w-4 h-4 sm:w-5 sm:h-5" />
                    <FaStar className="w-4 h-4 sm:w-5 sm:h-5" />
                    <FaStar className="w-4 h-4 sm:w-5 sm:h-5" />
                    <FaStar className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <span className="text-gray-500 text-xs sm:text-sm ml-2">
                    ({item.stars})
                  </span>
                </div>
                <div className="mt-2 sm:mt-3 flex items-center gap-2 justify-center">
                  <span className="line-through text-sm sm:text-base text-gray-500">
                    {formatPrice(item.originalPrice)}
                  </span>
                  <div className="text-red-500 text-sm sm:text-base font-bold">
                    {formatPrice(item.discountedPrice)}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
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
          onAddToCart={handleAddToCart}
        />
      )}
    </div>
  );
}

export default ProjectorsAndLights;
