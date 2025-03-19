const { imageUploadUtil } = require("../../helpers/cloudinary");
const Product = require("../../models/Product");

exports.handleImageUpload = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await imageUploadUtil(url);

    res.json({
      success: true,
      result,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: "false",
      message: "Error occured during image upload",
    });
  }
};

// Add a new Product

exports.addProduct = async (req, res) => {
  try {
    const {
      image,
      productName,
      description,
      category,
      brand,
      price,
      salePrice,
      stock,
    } = req.body;
    const newlyCreatedProduct = new Product({
      image,
      productName,
      description,
      category,
      brand,
      price,
      salePrice,
      stock,
    });

    await newlyCreatedProduct.save();
    res.status(201).json({
      success: true,
      data: newlyCreatedProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error  during adding new Product by Admin",
    });
  }
};

// Fetch All products
exports.getAllProducts = async (req, res) => {
  try {
    const listOfProducts = await Product.find();
    res.status(200).json({
      success: true,
      data: listOfProducts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error  fetching products",
    });
  }
};
// Edit  a product
exports.editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      image,
      productName,
      description,
      category,
      brand,
      price,
      salePrice,
      stock,
    } = req.body;
    const findProduct = await Product.findById(id);
    if (!findProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not Found",
      });
    }

    findProduct.productName = productName || findProduct.productName;
    findProduct.image = image || findProduct.image;
    findProduct.description = description || findProduct.description;
    findProduct.category = category || findProduct.category;
    findProduct.brand = brand || findProduct.brand;
    findProduct.price = price || findProduct.price;
    findProduct.salePrice = salePrice || findProduct.salePrice;
    findProduct.stock = stock || findProduct.stock;

    await findProduct.save();
    res.status(200).json({
      success: true,
      data: findProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error  during adding new Product by Admin",
    });
  }
};
// Delete a product
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not Found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error  during adding new Product by Admin",
    });
  }
};
