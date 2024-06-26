const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  /*
  productId: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  }*/
  name: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  price: {
    type: Number,
    min: 0,
  },
  dimensions: {
    length: {
      type: Number,
      min: 0,
    },
    width: {
      type: Number,
      min: 0,
    },
    height: {
      type: Number,
      min: 0,
    },
  },
  weight: {
    type: Number,
    min: 0,
  },
  materials: [
    {
      type: String,
      trim: true,
    },
  ],
  categories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
    },
  ],
  images: [
    {
      url: {
        type: String,
        trim: true,
      },
      altText: {
        type: String,
        trim: true,
      },
    },
  ],
  stockQuantity: {
    type: Number,
    min: 0,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    default: "onSale"
  }
});


module.exports = productSchema;
