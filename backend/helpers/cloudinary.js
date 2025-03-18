const cloudinary = require("cloudinary");

const multer = require("multer");

// Configuration
cloudinary.config({
  cloud_name: "dgxqwczc0",
  api_key: "135988155395165",
  api_secret: "K1Cy3JcBefY9ZbFicRlhHlkb9GE", // Click 'View API Keys' above to copy your API secret
});
// CLOUDINARY_URL=cloudinary://135988155395165:K1Cy3JcBefY9ZbFicRlhHlkb9GE@dgxqwczc0

const storage = new multer.memoryStorage();

exports.imageUploadUtil = async (file) => {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: 'auto',
  });
  return result;
};

exports.upload = multer({ storage });
