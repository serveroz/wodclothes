const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true
  },
  brand: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  stock: {
    type: Number,
    required: [true, 'Stock quantity is required'],
    min: [0, 'Stock cannot be negative'],
    default: 0
  },
  sizes: {
    type: Array,
    required: [true, 'Sizes are required'],
    default: []
  },
  colors: {
    type: Array,
    required: [true, 'Colors are required'],
    default: []
  },
  image: {
    type: String,
    required: [true, 'Product image is required']
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: [0, 'Price cannot be negative']
  }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product; 