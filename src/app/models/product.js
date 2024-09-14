const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  price: { type: Number, required: true }
});

module.exports = mongoose.models.Product || mongoose.model('Product', ProductSchema);
