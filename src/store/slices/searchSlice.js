import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for searching products
export const searchProducts = createAsyncThunk(
  'search/searchProducts',
  async (query, { getState }) => {
    try {
      // Get products from the state
      const projectors = getState().projectors;

      // Filter products based on the search query
      const results = projectors.filter((product) => {
        const searchTerm = query.toLowerCase();

        // Search in description
        if (product.description.toLowerCase().includes(searchTerm)) {
          return true;
        }

        // Search in price range
        if (!isNaN(Number(searchTerm))) {
          const searchPrice = Number(searchTerm);
          if (
            searchPrice >= product.discountedPrice - 1000 &&
            searchPrice <= product.discountedPrice + 1000
          ) {
            return true;
          }
        }

        return false;
      });

      return {
        results,
        query,
      };
    } catch (error) {
      console.error('Search error:', error);
      return {
        results: [],
        query,
        error: error.message,
      };
    }
  }
);

export const SearchSlice = createSlice({
  name: 'search',
  initialState: {
    searchResults: [],
    recentSearches: [],
    currentQuery: '',
    loading: false,
    error: null,
  },
  reducers: {
    clearSearchResults: (state) => {
      state.searchResults = [];
      state.currentQuery = '';
    },
    addRecentSearch: (state, action) => {
      // Add to recent searches and remove duplicates
      const query = action.payload;
      const existingIndex = state.recentSearches.indexOf(query);

      if (existingIndex !== -1) {
        // Remove from current position
        state.recentSearches.splice(existingIndex, 1);
      }

      // Add to beginning of array
      state.recentSearches.unshift(query);

      // Limit to 5 recent searches
      if (state.recentSearches.length > 5) {
        state.recentSearches.pop();
      }
    },
    clearRecentSearches: (state) => {
      state.recentSearches = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload.results;
        state.currentQuery = action.payload.query;

        // Add to recent searches if there are results
        if (action.payload.results.length > 0) {
          const query = action.payload.query;
          // Use the reducer we defined above
          const existingIndex = state.recentSearches.indexOf(query);

          if (existingIndex !== -1) {
            // Remove from current position
            state.recentSearches.splice(existingIndex, 1);
          }

          // Add to beginning of array
          state.recentSearches.unshift(query);

          // Limit to 5 recent searches
          if (state.recentSearches.length > 5) {
            state.recentSearches.pop();
          }
        }
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error || 'Failed to search products';
      });
  },
});

export const { clearSearchResults, addRecentSearch, clearRecentSearches } =
  SearchSlice.actions;

export default SearchSlice.reducer;
