const mongoose = require("mongoose");

const productSchem = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String, 
        required: true
    },
    price: {
        type: Number
    }
});


const Product = mongoose.model("Product", productSchem);

module.exports = Product;
