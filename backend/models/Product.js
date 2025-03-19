const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true,
        trim: true
    },
    productName: {
    type: String,
    required: true,
    trim: true
},
description: {
    type: String,
    required: true,
    trim: true
},
category: {
    type: String,
    required: true,
    trim: true
},
brand: {
    type: String
},
price: {
    type: Number,
    min: 0 
},
salePrice: {
    type: Number,
    min: 0
},
stock: {
    type: Number,
    min: 0
},
}, {timestamps: true});

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product