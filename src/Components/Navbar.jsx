import React, { useState, useRef, useEffect } from 'react';
import { Search, ShoppingBag, ChevronDown, Menu, X } from 'lucide-react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

const SupportDropdown = ({ isVisible, closeDropdown }) => {
  if (!isVisible) return null;
  return (
    <div className="absolute top-full left-0 bg-white border border-gray-200 rounded shadow-lg w-48 z-50">
      <div className="py-2">
        <NavLink
          to="/support/faqs"
          className="block px-4 py-2 hover:bg-gray-100 hover:text-purple-600 transition-colors"
          onClick={closeDropdown}
        >
          FAQs
        </NavLink>
        <NavLink
          to="/support/contact"
          className="block px-4 py-2 hover:bg-gray-100 hover:text-purple-600 transition-colors"
          onClick={closeDropdown}
        >
          Contact Us
        </NavLink>
        <NavLink
          to="/support/shipping"
          className="block px-4 py-2 hover:bg-gray-100 hover:text-purple-600 transition-colors"
          onClick={closeDropdown}
        >
          Shipping
        </NavLink>
      </div>
    </div>
  );
};

const Navbar = () => {
  const [fixed, setFixed] = useState(false);
  const [supportHovered, setSupportHovered] = useState(false);
  const [isScrolledSearchOpen, setIsScrolledSearchOpen] = useState(false);
  const [mainHeaderHeight, setMainHeaderHeight] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [mainSearchQuery, setMainSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSupportOpen, setMobileSupportOpen] = useState(false);

  const navbarRef = useRef(null);
  const bannerRef = useRef(null);
  const mainHeaderRef = useRef(null);
  const supportRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.cartProducts);
  const cartCount = cartItems.reduce(
    (acc, item) => acc + (item.quantity || 1),
    0
  );

  useEffect(() => {
    setSupportHovered(false);
    setMobileMenuOpen(false);
    setMobileSupportOpen(false);
  }, [location]);

  useEffect(() => {
    if (mainHeaderRef.current) {
      setMainHeaderHeight(mainHeaderRef.current.offsetHeight);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (bannerRef.current && mainHeaderRef.current) {
        const totalHeight =
          bannerRef.current.offsetHeight + mainHeaderRef.current.offsetHeight;
        setFixed(window.scrollY > totalHeight);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [mobileMenuOpen]);

  const closeSupport = () => setSupportHovered(false);

  const handleSearch = (query, e) => {
    if (e) {
      e.preventDefault();
    }
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
      setIsScrolledSearchOpen(false);
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleMobileSupport = () => {
    setMobileSupportOpen(!mobileSupportOpen);
  };

  return (
    <>
      <div
        ref={bannerRef}
        className="w-full transition-transform ease-in-out duration-300 bg-purple-600 text-white p-3 text-center text-sm md:text-base"
      >
        Enjoy "FREE SHIPPING" All over Pakistan
      </div>

      <div
        ref={mainHeaderRef}
        className="w-full bg-white transition-all duration-300"
      >
        {!fixed && (
          <div className="container mx-auto px-4 py-4 md:py-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-3xl md:text-5xl font-bold">E-Marketana</div>
            <div className="flex flex-col space-y-4 w-full md:w-auto">
              <form
                onSubmit={(e) => handleSearch(mainSearchQuery, e)}
                className="relative border border-gray-300 py-1 rounded w-full md:w-auto"
              >
                <input
                  type="text"
                  placeholder="Search"
                  className="outline-none w-full pl-3 pr-8 py-1"
                  value={mainSearchQuery}
                  onChange={(e) => setMainSearchQuery(e.target.value)}
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-transparent border-none p-0"
                >
                  <Search className="h-4 w-4 text-gray-500" />
                </button>
              </form>
              <div className="flex items-center justify-between md:justify-evenly space-x-2 md:space-x-5">
                <NavLink
                  to="/cart"
                  className="flex items-center space-x-1 hover:text-purple-600"
                >
                  <ShoppingBag className="h-5 w-5 md:h-6 md:w-6 cursor-pointer" />
                  <p className="text-sm md:text-base">Shopping Cart</p>
                  <span className="bg-gray-800 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                </NavLink>
              </div>
            </div>
          </div>
        )}
      </div>
      {fixed && <div style={{ height: mainHeaderHeight }}></div>}

      <nav
        ref={navbarRef}
        className={`w-full bg-white transition-all duration-300 ${
          fixed ? 'fixed top-0 shadow-md z-50 left-0' : ''
        }`}
      >
        <div
          className={`container mx-auto px-4 ${fixed ? 'py-2' : 'py-3'} flex items-center justify-between`}
        >
          {fixed && (
            <div className="flex items-center">
              <NavLink to="/" className="bg-purple-600 p-2 md:p-3">
                <span className="text-white font-bold text-sm md:text-lg">
                  E-Marketana
                </span>
              </NavLink>
            </div>
          )}

          <div className={`hidden md:flex space-x-6 ${fixed ? 'ml-6' : ''}`}>
            <NavLink to="/" className="font-semibold hover:text-purple-600">
              HOME
            </NavLink>
            <NavLink
              to="/projectors"
              className="font-semibold hover:text-purple-600"
            >
              PROJECTORS & LIGHTS
            </NavLink>
            <NavLink
              to="/about-us"
              className="font-semibold hover:text-purple-600"
            >
              ABOUT US
            </NavLink>
            <div
              ref={supportRef}
              className="relative"
              onMouseEnter={() => setSupportHovered(true)}
              onMouseLeave={() => setSupportHovered(false)}
            >
              <div className="flex items-center cursor-pointer font-semibold hover:text-purple-600">
                <span>SUPPORT</span>
                <ChevronDown className="h-4 w-4 ml-1" />
              </div>
              <SupportDropdown
                isVisible={supportHovered}
                closeDropdown={closeSupport}
              />
            </div>
          </div>

          {fixed && (
            <div className="flex items-center space-x-4">
              <div className="hidden md:block relative">
                {isScrolledSearchOpen ? (
                  <form
                    onSubmit={(e) => handleSearch(searchQuery, e)}
                    className="flex items-center"
                  >
                    <input
                      type="text"
                      placeholder="Search"
                      className="border border-gray-300 rounded-l px-2 py-1 focus:outline-none"
                      autoFocus
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onBlur={() => {
                        if (!searchQuery.trim()) {
                          setIsScrolledSearchOpen(false);
                        }
                      }}
                    />
                    <button
                      type="submit"
                      className="bg-purple-600 text-white p-1 rounded-r hover:bg-purple-700 transition-colors"
                      onClick={() => handleSearch(searchQuery)}
                    >
                      <Search className="h-5 w-5" />
                    </button>
                  </form>
                ) : (
                  <Search
                    className="h-5 w-5 cursor-pointer text-gray-700 hover:text-purple-600 transition-colors"
                    onClick={() => setIsScrolledSearchOpen(true)}
                  />
                )}
              </div>
              <div className="relative">
                <NavLink to="/cart">
                  <ShoppingBag className="h-5 w-5 md:h-6 md:w-6 cursor-pointer hover:text-purple-600 transition-colors" />
                </NavLink>
                <span className="absolute -top-2 -right-2 bg-gray-800 text-white text-xs rounded-full h-4 w-4 md:h-5 md:w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              </div>

              <div className="md:hidden">
                <button
                  onClick={toggleMobileMenu}
                  className="p-2"
                  aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                >
                  {mobileMenuOpen ? (
                    <X className="h-6 w-6 text-gray-700" />
                  ) : (
                    <Menu className="h-6 w-6 text-gray-700" />
                  )}
                </button>
              </div>
            </div>
          )}

          {!fixed && (
            <div className="md:hidden flex items-center">
              <button
                onClick={toggleMobileMenu}
                className="p-2"
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6 text-gray-700" />
                ) : (
                  <Menu className="h-6 w-6 text-gray-700" />
                )}
              </button>
            </div>
          )}
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-50 bg-white pt-16">
            <button
              onClick={toggleMobileMenu}
              className="absolute top-4 right-4 p-2 z-10"
              aria-label="Close menu"
            >
              <X className="h-6 w-6 text-gray-700" />
            </button>

            <div className="container mx-auto px-4 py-4 flex flex-col space-y-6">
              <NavLink
                to="/"
                className="text-xl font-semibold py-2 border-b border-gray-100"
              >
                HOME
              </NavLink>
              <NavLink
                to="/projectors"
                className="text-xl font-semibold py-2 border-b border-gray-100"
              >
                PROJECTORS & LIGHTS
              </NavLink>
              <NavLink
                to="/about-us"
                className="text-xl font-semibold py-2 border-b border-gray-100"
              >
                ABOUT US
              </NavLink>
              <div>
                <div
                  className="flex items-center justify-between text-xl font-semibold py-2 border-b border-gray-100"
                  onClick={toggleMobileSupport}
                >
                  <span>SUPPORT</span>
                  <ChevronDown
                    className={`h-5 w-5 transition-transform ${mobileSupportOpen ? 'rotate-180' : ''}`}
                  />
                </div>
                {mobileSupportOpen && (
                  <div className="ml-4 py-2 flex flex-col space-y-3">
                    <NavLink to="/support/faqs" className="py-1 text-lg">
                      FAQs
                    </NavLink>
                    <NavLink to="/support/contact" className="py-1 text-lg">
                      Contact Us
                    </NavLink>
                    <NavLink to="/support/shipping" className="py-1 text-lg">
                      Shipping
                    </NavLink>
                  </div>
                )}
              </div>
              <div className="flex flex-col space-y-4 pt-6">
                <form
                  onSubmit={(e) => handleSearch(searchQuery, e)}
                  className="relative"
                >
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full px-4 py-2 border border-gray-300 rounded"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  >
                    <Search className="h-5 w-5 text-gray-500" />
                  </button>
                </form>
                <div className="flex items-center justify-between py-4 border-t border-gray-100">
                  <NavLink
                    to="/cart"
                    className="flex items-center space-x-2 hover:text-purple-600"
                  >
                    <ShoppingBag className="h-6 w-6" />
                    <span className="text-lg">Cart ({cartCount})</span>
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        )}

        <div
          className={`md:hidden ${fixed && !mobileMenuOpen ? 'block' : 'hidden'} border-t`}
        >
          <div className="flex justify-around py-2">
            <NavLink
              to="/"
              className="text-xs font-medium hover:text-purple-600"
            >
              HOME
            </NavLink>
            <NavLink
              to="/projectors"
              className="text-xs font-medium hover:text-purple-600"
            >
              PROJECTORS
            </NavLink>
            <NavLink
              to="/about-us"
              className="text-xs font-medium hover:text-purple-600"
            >
              ABOUT
            </NavLink>
          </div>
        </div>
      </nav>
      {fixed && <div className="h-12 md:h-14"></div>}
    </>
  );
};

export default Navbar;
