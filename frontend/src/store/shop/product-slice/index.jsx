import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// ✅ Get All Filtered Products
export const getAllFilteredProducts = createAsyncThunk(
  "products/getAll",
  async ({ filterParams, sortParams }, { rejectWithValue }) => {
    
    try {
      const query = new URLSearchParams({
        ...filterParams,
        sortBy: sortParams,
      });
      
      const response = await axios.get(
        `http://localhost:5000/api/shop/products/get?${query}`,
        { withCredentials: true }
      );
      
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Fetching products failed"
      );
    }
  }
);

// Get single Product detail
export const getProductDetails = createAsyncThunk(
  "product/getProductDetails",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/shop/products/get/${id}`,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Fetching product details failed"
      );
    }
  }
);

// ✅ Initial State
const initialState = {
  products: [],
  loading: false,
  error: null,
  productDetails: null
};

// ✅ Create Redux Slice
const shopProductsSlice = createSlice({
  name: "shoppingProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 📌 Handle Create Product
      .addCase(getAllFilteredProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllFilteredProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        
      })
      .addCase(getAllFilteredProducts.rejected, (state) => {
        state.loading = false;
        state.products = [];
      })
      // 📌 Handle Get Product Details
      .addCase(getProductDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.productDetails = action.payload.data;
        
      })
      .addCase(getProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default shopProductsSlice.reducer;
