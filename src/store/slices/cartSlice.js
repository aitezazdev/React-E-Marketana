import { createSlice } from '@reduxjs/toolkit';

// Load cart state from localStorage if available
const loadCartFromStorage = () => {
  try {
    const savedCart = localStorage.getItem('cartState');
    if (savedCart) {
      return JSON.parse(savedCart);
    }
  } catch (error) {
    console.error('Error loading cart from localStorage:', error);
  }
  return { cartProducts: [], message: '' };
};

// Save cart state to localStorage
const saveCartToStorage = (state) => {
  try {
    localStorage.setItem('cartState', JSON.stringify(state));
  } catch (error) {
    console.error('Error saving cart to localStorage:', error);
  }
};

export const CartSlice2 = createSlice({
  name: 'cart',
  initialState: loadCartFromStorage(),
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.cartProducts.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += 1;
        state.message = 'Increased product quantity';
      } else {
        state.cartProducts.push({ ...action.payload, quantity: 1 });
        state.message = 'Added product to cart';
      }
      saveCartToStorage(state);
    },
    removeFromCart: (state, action) => {
      const existingItem = state.cartProducts.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        // If removeAll flag is set, remove the item completely
        if (action.payload.removeAll) {
          state.cartProducts = state.cartProducts.filter(
            (item) => item.id !== action.payload.id
          );
          state.message = 'Removed product from cart';
        } else if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
          state.message = 'Decreased product quantity';
        } else {
          state.cartProducts = state.cartProducts.filter(
            (item) => item.id !== action.payload.id
          );
          state.message = 'Removed product from cart';
        }
      }
      saveCartToStorage(state);
    },
    updateQuantity: (state, action) => {
      const index = state.cartProducts.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.cartProducts[index] = {
          ...state.cartProducts[index],
          quantity: action.payload.quantity,
        };
      }
      saveCartToStorage(state);
    },
    // New reducer to clear the entire cart
    clearCart: (state) => {
      state.cartProducts = [];
      state.message = 'Cart cleared';
      saveCartToStorage(state);
    },
    // New reducer to sync with localStorage (useful for multi-tab scenarios)
    syncWithStorage: (state) => {
      const savedState = loadCartFromStorage();
      state.cartProducts = savedState.cartProducts;
      state.message = 'Cart synced with storage';
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  syncWithStorage,
} = CartSlice2.actions;

export default CartSlice2.reducer;
