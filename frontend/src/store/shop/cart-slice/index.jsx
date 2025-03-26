import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  cartItems: [], // Stores the list of cart items
  loading: false, // Indicates loading state for API calls
  error: null, // Stores error messages
};

// Async thunk for adding an item to the cart
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ userId, productId, quantity }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/shop/cart/add`,
        { userId, productId, quantity }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


// Async thunk for fetching all cart items for a user
export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async ( userId , { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/shop/cart/get/${userId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for deleting an item from the cart
export const deleteCartItem = createAsyncThunk(
  "cart/deleteCartItem",
  async ({ userId, productId }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/shop/cart/${userId}/${productId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for updating cart item quantity
export const updateCartQuantity = createAsyncThunk(
  "cart/updateCartQuantity",
  async ({ userId, productId, quantity }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/shop/cart/update-cart`,
        { userId, productId, quantity }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Create the shopping cart slice
const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle addToCart action
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems= action.payload.data;
    })
    .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.cartItems= [];
        state.error = action.payload;
      })
      
      // Handle fetchCartItems action
      .addCase(fetchCartItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload.data;
        
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.loading = false;
        state.cartItems= [];
        state.error = action.payload;
      })
      
      // Handle deleteCartItem action
      .addCase(deleteCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems= action.payload.data;
      })
      .addCase(deleteCartItem.rejected, (state, action) => {
        state.loading = false;
        state.cartItems= [];
        state.error = action.payload;
      })
      
      // Handle updateCartQuantity action
      .addCase(updateCartQuantity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCartQuantity.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems= action.payload.data})
      .addCase(updateCartQuantity.rejected, (state, action) => {
        state.loading = false;
        state.cartItems= [];
        state.error = action.payload;
      });
  },
});

// Export the slice reducer
export default shoppingCartSlice.reducer;
