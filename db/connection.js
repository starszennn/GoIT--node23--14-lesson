const mongoose = require('mongoose');

const CONNECTION_STRING = process.env.CONNECTION_STRING;

const db = mongoose.connect(CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

module.exports = db;