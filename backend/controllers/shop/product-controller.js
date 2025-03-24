const { imageUploadUtil } = require("../../helpers/cloudinary");
const Product = require("../../models/Product");

// Fetch filtered products based on query parameters
exports.getFilteredProducts = async (req, res) => {
  try {
    // Destructure query parameters with default values
    const { brand = "", category = "", sortBy = "price-lowtohigh" } = req.query;
    
    // Construct filters dynamically
    const filters = {};
    if (category) filters.category = { $in: category.split(",") };
    if (brand) filters.brand = { $in: brand.split(",") };
    
    // Sorting options mapping
    const sortOptions = {
      "price-lowtohigh": { price: 1 },
      "price-hightolow": { price: -1 },
      "a-to-z": { productName: 1 },
      "z-to-a": { productName: -1 },
    };
    
    // Apply sorting based on the provided sortBy parameter, defaulting to price ascending
    const sort = sortOptions[sortBy] || { price: 1 };
    
    
    // Fetch products from the database with applied filters and sorting
    const products = await Product.find(filters).sort(sort);
    
    // Send success response with filtered products
    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.error("Error fetching products:", error); // Improved error logging
    res.status(500).json({
      success: false,
      message: "Error fetching products", // Fixed typo
    });
  }
};



exports.getProductDetails = async (req, res) => {
  try {
    const {id} = req.params;
    const product = await Product.findById(id)
    if(!product) return res.status(404).json({
      success: false,
      message: 'Product Not Found'
    })

    res.status(200).json({
      success: true,
      data: product
    })
  } catch (error) {
    console.error("Error fetching products:", error); // Improved error logging
    res.status(500).json({
      success: false,
      message: "Error fetching products", // Fixed typo
    });
  }
}