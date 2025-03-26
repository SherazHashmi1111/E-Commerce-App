const Product = require("../../models/Product");
const Cart = require("../../models/Cart");
// Add item to cart
exports.addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    if (!userId || !productId || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided!!!",
      });
    }
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product Not Found",
      });
    }

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const findCurrentProductIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );
    if (findCurrentProductIndex === -1) {
      cart.items.push({ productId, quantity });
    } else {
      cart.items[findCurrentProductIndex].quantity += quantity;
    }

    await cart.save();
    res.status(200).json({
      success: true,
      data: cart,
    });
  } catch (error) {
    console.error("Error fetching products:", error); // Improved error logging
    res.status(500).json({
      success: false,
      message: "Error fetching products", // Fixed typo
    });
  }
};

// Get item from cart
exports.fetchCartItem = async (req, res) => {
  try {
    const { userId } = req.params;
    
    if (!userId) {
      return res.status(500).json({
        success: false,
        message: "UserId is required", // Fixed typo
      });
    }
    

    const cart = await Cart.findOne({ userId }).populate({
      path: "items.productId",
      select: "image productName price salePrice",
    });
    if (!cart) {
      res.status(404).json({
        success: false,
        message: "Cart not found", // Fixed typo
      });
    }

    const validItems = cart.items.filter(
      (productItem) => productItem.productId
    );

    if (validItems.length < cart.items.length) {
      cart.items = validItems;
      await cart.save();
    }

    const populateCartItems = validItems.map((item) => ({
      productId: item.productId._id,
      image: item.productId.image,
      productName: item.productId.productName,
      price: item.productId.price,
      salePrice: item.productId.salePrice,
      quantity: item.quantity,
    }));

    res.status(200).json({
      success: true,
      data: {
        ...cart._doc,
        items: populateCartItems,
      },
    });
  } catch (error) {
    console.error("Error fetching products:", error); // Improved error logging
    res.status(500).json({
      success: false,
      message: "Error fetching products", // Fixed typo
    });
  }
};

// Update item in cart
exports.updateCartItemQty = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    if (!userId || !productId || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided!!!",
      });
    }
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      res.status(404).json({
        success: false,
        message: "Cart not found", // Fixed typo
      });
    }

    const findCurrentProductIndex = cart.items.findIndex((item) => {
      item.productId.toString() === productId;
    });
    if (findCurrentProductIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Cart Item not found",
      });
    }

    cart.items[findCurrentProductIndex].quantity = quantity;

    await cart.save();
    await cart.populate({
      path: "items.productId",
      select: "item productName price salePrice",
    });

    const populateCartItems = cart.items.map((item) => ({
      productId: item.productId ? item.productId._id : null,
      image: item.productId ? item.productId.image : null,
      productName: item.productId ? item.productId.productName : null,
      price: item.productId ? item.productId.price : null,
      salePrice: item.productId ? item.productId.salePrice : null,
      quantity: item.productId.quantity,
    }));

    res.status(200).json({
      success: true,
      data: {
        ...cart._doc,
        items: populateCartItems,
      },
    });
  } catch (error) {
    console.error("Error fetching products:", error); // Improved error logging
    res.status(500).json({
      success: false,
      message: "Error fetching products", // Fixed typo
    });
  }
};
// Delete item from cart
exports.deleteCartItem = async (req, res) => {
  try {
    const { userId, productId } = req.params;
    if (!userId || !productId) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided!!!",
      });
    }

    const cart = await Cart.findOne({ userId }).populate({
      path: "items.productId",
      select: "item productName price salePrice",
    });
    if (!cart) {
     return res.status(404).json({
        success: false,
        message: "Cart not found", // Fixed typo
      });
    }

    cart.items = cart.items.filter(
      (item) => item.productId._id.toString() !== productId
    );

    await cart.save();

    await cart.populate({
      path: "items.productId",
      select: "item productName price salePrice",
    });

    const populateCartItems = cart.items.map((item) => ({
      productId: item.productId ? item.productId._id : null,
      image: item.productId ? item.productId.image : null,
      productName: item.productId ? item.productId.productName : null,
      price: item.productId ? item.productId.price : null,
      salePrice: item.productId ? item.productId.salePrice : null,
      quantity: item.quantity,
    }));

    res.status(200).json({
      success: true,
      data: {
        ...cart._doc,
        items: populateCartItems,
      },
    });
  } catch (error) {
    console.error("Error fetching products:", error); // Improved error logging
    res.status(500).json({
      success: false,
      message: "Error fetching products", // Fixed typo
    });
  }
};
