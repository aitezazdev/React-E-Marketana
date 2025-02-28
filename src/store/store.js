import { configureStore } from '@reduxjs/toolkit';
import ProjectorsReducer from './slices/ProjectorsSlice';
import cartReducer from './slices/cartSlice';
import searchReducer from './slices/searchSlice';

const store = configureStore({
  reducer: {
    projectors: ProjectorsReducer,
    cart: cartReducer,
    search: searchReducer,
  },
});

export default store;
