import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { FaStar, FaShoppingCart, FaEye } from 'react-icons/fa';
import { Search } from 'lucide-react';
import {
  searchProducts,
  clearSearchResults,
} from '../store/slices/searchSlice';
import { addToCart } from '../store/slices/cartSlice';
import ShoppingCart from '../Components/ShoppingCart';
import ProductQuickView from '../Components/ProductQuickView';

const SearchResults = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { searchResults, loading, error, currentQuery, recentSearches } =
    useSelector((state) => state.search);
  const cartItems = useSelector((state) => state.cart.cartProducts);

  const [showCart, setShowCart] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('q') || '';

  useEffect(() => {
    if (searchQuery) {
      dispatch(searchProducts(searchQuery));
    } else {
      dispatch(clearSearchResults());
    }

    return () => {
      dispatch(clearSearchResults());
    };
  }, [dispatch, searchQuery]);

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

  const handleSearch = (query) => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Search Results</h1>

      <div className="mb-8">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const query = e.target.search.value;
            if (query.trim()) {
              handleSearch(query);
            }
          }}
          className="flex"
        >
          <input
            type="text"
            name="search"
            placeholder="Search products..."
            defaultValue={searchQuery}
            className="flex-grow border border-gray-300 rounded-l px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          <button
            type="submit"
            className="bg-purple-600 text-white px-4 py-2 rounded-r hover:bg-purple-700 transition-colors"
          >
            <Search className="h-5 w-5" />
          </button>
        </form>
      </div>

      {recentSearches.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Recent Searches</h2>
          <div className="flex flex-wrap gap-2">
            {recentSearches.map((query, index) => (
              <button
                key={index}
                onClick={() => handleSearch(query)}
                className="bg-gray-100 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors"
              >
                {query}
              </button>
            ))}
          </div>
        </div>
      )}

      {loading && <div className="text-center py-8">Loading results...</div>}

      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded mb-6">
          Error: {error}
        </div>
      )}

      {!loading && searchResults.length === 0 && searchQuery && (
        <div className="text-center py-8">
          <p className="text-lg text-gray-600">
            No results found for "{searchQuery}"
          </p>
          <p className="mt-2 text-gray-500">
            Try using different keywords or check for spelling mistakes.
          </p>
        </div>
      )}

      {searchResults.length > 0 && (
        <div>
          <p className="mb-4 text-gray-600">
            Found {searchResults.length} results for "{currentQuery}"
          </p>

          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {searchResults.map((item, index) => (
              <ProductCard
                key={index}
                item={item}
                index={index}
                handleAddToCart={handleAddToCart}
                onQuickView={() => setQuickViewProduct({ ...item, id: index })}
              />
            ))}
          </div>
        </div>
      )}

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
};

function ProductCard({ item, index, handleAddToCart, onQuickView }) {
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
          isHovered
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

      <div className="w-full h-72 overflow-hidden relative">
        <Link to={`/product/${index + 1}`}>
          <div className="relative w-full h-full">
            <img
              src={item.image}
              alt={item.description || 'Product Image'}
              className={`w-full h-full object-cover object-center absolute top-0 left-0 transition-opacity duration-500 ${
                isHovered ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <img
              src={item.hoverImage || item.image}
              alt={`${item.description || 'Product'} alternate view`}
              className={`absolute top-0 h-full object-cover object-center transition-all duration-500 ${
                isHovered
                  ? 'opacity-100 w-[70%] left-1/2 -translate-x-1/2'
                  : 'opacity-0 w-full left-0'
              }`}
            />
          </div>
        </Link>
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
      </div>

      <div className="p-5">
        <Link to={`/product/${index + 1}`}>
          <h3 className="font-medium mb-3 text-center line-clamp-2 h-10">
            {item.description.slice(0, 38) || 'Product Description'}
          </h3>
        </Link>
        <div className="flex items-center mb-3 justify-center">
          <div className="flex text-yellow-400">
            <FaStar className="w-4 h-4" />
            <FaStar className="w-4 h-4" />
            <FaStar className="w-4 h-4" />
            <FaStar className="w-4 h-4" />
            <FaStar className="w-4 h-4" />
          </div>
          <span className="text-gray-500 text-xs ml-2">
            ({item.stars || 0})
          </span>
        </div>
        <div className="mt-3 flex items-center gap-2 justify-center">
          <span className="line-through text-xs text-gray-500">
            {formatPrice(item.originalPrice)}
          </span>
          <div className="text-red-600 font-bold">
            {formatPrice(item.discountedPrice)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchResults;
