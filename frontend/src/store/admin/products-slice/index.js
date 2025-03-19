import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/admin/products";

// ✅ Create a Product
export const createProduct = createAsyncThunk(
  "products/create",
  async (formData, { rejectWithValue }) => {
    
    try {
      const response = await axios.post(`${API_URL}/add`, formData, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Product creation failed");
    }
  }
);

// ✅ Get All Products
export const getAllProducts = createAsyncThunk(
  "products/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL, { withCredentials: true });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Fetching products failed");
    }
  }
);

// ✅ Update a Product
export const updateProduct = createAsyncThunk(
  "products/update",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/edit/${id}`, formData, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Updating product failed");
    }
  }
);

// ✅ Delete a Product
export const deleteProduct = createAsyncThunk(
  "products/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${API_URL}/delete/${id}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Deleting product failed");
    }
  }
);

// ✅ Initial State
const initialState = {
  products: [],
  loading: false,
  error: null,
};

// ✅ Create Redux Slice
const adminProductsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 📌 Handle Create Product
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products=action.payload.data;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 📌 Handle Get All Products
      .addCase(getAllProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

  },
});

export default adminProductsSlice.reducer;
