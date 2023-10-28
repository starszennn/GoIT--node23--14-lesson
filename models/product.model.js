const { db } = require('../db/connection');
const { Schema, model } = require('mongoose');

const product = new Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: false
  },
});

const Product = model("product", product);

module.exports = { Product };