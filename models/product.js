const mongoose = require('mongoose');

// Define the schema
const productSchema = new mongoose.Schema({
productId: Number,
  name: String,
  price: Number,
  category: String
});

// Export the model
module.exports = mongoose.model('Products', productSchema);