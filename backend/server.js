const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require('dotenv')
const authRouter = require('./routes/auth/auth-routes')
const adminProductsRouter = require('./routes/admin/products-routes')
const shopProductsRouter = require('./routes/shop/products-routes')
const shopCartRouter = require('./routes/shop/cart-routes')


// Load environment variables from .env file
dotenv.config({ path: './config/config.env' });

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/newecommerce")
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((error) => {
    console.log("MongoDB connection error:", error);
  });

const app = express();
const PORT = process.env.PORT || 4000;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  }) 
);

app.use(cookieParser());
app.use(express.json());
app.use('/api/auth', authRouter)
app.use('/api/admin/products', adminProductsRouter)
app.use('/api/shop/products', shopProductsRouter)
app.use('/api/shop/cart', shopCartRouter)

app.listen(PORT, () => {console.log(`Server is working on PORT : ${PORT}`);
})