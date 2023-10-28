const { db } = require('../db/connection');
const { Schema, model } = require('mongoose');

const user = new Schema({
  login: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

const User = model("user", user);

module.exports = { User };
