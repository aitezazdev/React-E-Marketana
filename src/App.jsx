import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import HomePage from './Pages/HomePage';
import AboutUs from './Pages/AboutUs';
import Projectors from './Pages/Projectors';
import Shipping from './Pages/Shipping';
import ContactUs from './Pages/ContactUs';
import Footer from './Components/Footer';
import Faqs from './Pages/Faqs';
import Cart from './Pages/Cart';
import Checkout from './Pages/Checkout';
import OrderConfirmation from './Pages/OrderConfirmation';
import ProductDetail from './Pages/ProductDetail';
import SearchResults from './Pages/SearchResults';
import ReviewsComponent from './Components/ReviewsComponent';
import Reviews from './Pages/Reviews';
import ScrollToTop from './Components/ScrollToTop';
import WhatsAppButton from './Components/WhatsAppButton';

const App = () => {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden relative">
      <Navbar />
      <ScrollToTop />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projectors" element={<Projectors />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/support/faqs" element={<Faqs />} />
          <Route path="/support/shipping" element={<Shipping />} />
          <Route path="/support/contact" element={<ContactUs />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route
            path="/confirmation"
            element={<OrderConfirmation whatsappNumber="+923081582025" />}
          />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/reviews" element={<Reviews />} />
        </Routes>
      </main>
      <ReviewsComponent />
      <WhatsAppButton />
      <Footer />
    </div>
  );
};

export default App;
