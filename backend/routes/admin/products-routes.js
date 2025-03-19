const express = require("express");
const {
  handleImageUpload,
  addProduct,
  getAllProducts,
  editProduct,
  deleteProduct
} = require("../../controllers/admin/product-controller");
const { upload } = require("../../helpers/cloudinary");
const router = express.Router();

router.post("/upload-image", upload.single('my_file'), handleImageUpload);
router.post("/add", addProduct);
router.put("/edit/:id", editProduct);
router.delete("/delete/:id", deleteProduct);
router.get("/", getAllProducts);

module.exports = router;
