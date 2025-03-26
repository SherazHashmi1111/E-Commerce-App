import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import adminProductsReducer from "./admin/products-slice/index";
import shopProductsReducer from "./shop/product-slice/index";
import shoppingCartReducer from "./shop/cart-slice/index";

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: adminProductsReducer,
    shopProducts: shopProductsReducer,
    shopCart: shoppingCartReducer,
  },
});

export default store;
