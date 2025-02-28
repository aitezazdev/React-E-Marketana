import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { FaStar, FaFire, FaEye, FaMinus, FaPlus } from 'react-icons/fa';
import ShoppingCart from '../Components/ShoppingCart';
import {
  addToCart,
  removeFromCart,
  updateQuantity,
} from '../store/slices/cartSlice';

const ProductDetail = () => {
  const { id } = useParams();
  const productIndex = parseInt(id, 10) - 1;
  const products = useSelector((state) => state.projectors);
  const product = products[productIndex];

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartProducts);

  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('White');
  const [showCart, setShowCart] = useState(false);

  const handleDecreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(<FaStar key={i} className="text-yellow-400 text-xl" />);
    }
    return stars;
  };

  const handleAddToCart = () => {
    const productInCart = cartItems.find((item) => item.id === productIndex);

    if (productInCart) {
      dispatch(
        updateQuantity({
          id: productIndex,
          quantity: productInCart.quantity + quantity,
        })
      );
    } else {
      dispatch(
        addToCart({
          id: productIndex,
          description: product.description,
          image: product.image,
          discountedPrice: product.discountedPrice,
          originalPrice: product.originalPrice,
          selectedColor,
        })
      );

      if (quantity > 1) {
        dispatch(
          updateQuantity({
            id: productIndex,
            quantity: quantity,
          })
        );
      }
    }
    setShowCart(true);
  };

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart({ id, removeAll: true }));
  };

  if (!product) {
    return (
      <div className="container mx-auto p-4">
        <h2>Product not found.</h2>
      </div>
    );
  }

  const subtotal = (product.discountedPrice * quantity).toFixed(2);

  return (
    <div className="container mx-auto p-4 sm:p-6 md:p-10">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left side - Product Image */}
        <div className="w-full md:w-1/2 bg-gray-800 rounded-lg relative">
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded">
            {product.discount}
          </div>
          <div className="p-4 sm:p-6">
            <h3 className="text-cyan-300 text-2xl mb-4 font-bold border-b border-cyan-300 pb-2">
              PACKAGE INCLUDES
            </h3>
            <div className="flex flex-col sm:flex-row items-center justify-around">
              <div className="product-box mb-4 sm:mb-0">
                <img
                  src={product.image}
                  className="w-32 sm:w-40 md:w-48 mx-auto"
                  alt="Packaging box"
                />
              </div>
              <div className="product-figure">
                <img
                  src={product.hoverImage}
                  className="w-full max-w-sm mx-auto"
                  alt={product.description}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Product Details */}
        <div className="w-full md:w-1/2">
          <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-center md:text-left">
            {product.description.toUpperCase()}
          </h1>

          <div className="flex items-center mb-2 justify-center md:justify-start">
            {renderStars()}
            <span className="ml-2">{product.stars} Reviews</span>
          </div>

          <div className="flex items-center text-red-500 mb-4 justify-center md:justify-start">
            <FaFire className="mr-2" />
            <span>5 sold in last 16 hours</span>
          </div>

          <div className="price-section mb-4 flex flex-col sm:flex-row items-center justify-center md:justify-start">
            <span className="line-through text-gray-500 text-xl">
              Rs.{product.originalPrice.toFixed(2)}
            </span>
            <span className="text-red-500 text-3xl font-bold ml-0 sm:ml-2 mt-2 sm:mt-0">
              Rs.{product.discountedPrice.toFixed(2)}
            </span>
          </div>

          <div className="variants mb-4 text-center md:text-left">
            <p className="font-medium mb-2">Variants: {selectedColor}</p>
            <div className="flex gap-2 justify-center md:justify-start">
              <button
                className={`border-2 ${selectedColor === 'White' ? 'border-black' : 'border-gray-300'} px-4 sm:px-6 py-2`}
                onClick={() => setSelectedColor('White')}
              >
                White
              </button>
              <button
                className={`border-2 ${selectedColor === 'Black' ? 'border-black' : 'border-gray-300'} px-4 sm:px-6 py-2`}
                onClick={() => setSelectedColor('Black')}
              >
                Black
              </button>
            </div>
          </div>

          <div className="quantity-section mb-4 text-center md:text-left">
            <p className="font-medium mb-2">Quantity:</p>
            <div className="flex justify-center md:justify-start">
              <button
                className="border border-gray-300 px-3 py-2"
                onClick={handleDecreaseQuantity}
              >
                <FaMinus />
              </button>
              <input
                type="text"
                className="border-t border-b border-gray-300 w-16 text-center"
                value={quantity}
                readOnly
              />
              <button
                className="border border-gray-300 px-3 py-2"
                onClick={handleIncreaseQuantity}
              >
                <FaPlus />
              </button>
            </div>
          </div>

          <div className="subtotal mb-6 text-center md:text-left">
            <p className="font-medium">Subtotal: Rs.{subtotal}</p>
          </div>

          <div className="buttons space-y-4">
            <button
              className="w-full bg-black text-white py-3 sm:py-4 text-lg font-bold"
              onClick={handleAddToCart}
            >
              ADD TO CART
            </button>
          </div>

          <div className="viewers mt-4 flex items-center justify-center md:justify-start">
            <FaEye className="mr-2" />
            <span>112 customers are viewing this product</span>
          </div>
        </div>
      </div>

      <ShoppingCart
        showCart={showCart}
        setShowCart={setShowCart}
        cartItems={cartItems}
        removeFromCart={handleRemoveFromCart}
      />
    </div>
  );
};

export default ProductDetail;
