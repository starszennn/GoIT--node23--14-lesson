const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/users.model');

const SECRET_KEY = process.env.JWT_SECRET;

async function jwtCheck(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1]

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const decoded = jwt.verify(token, SECRET_KEY);

  const { _id: id } = decoded.candidate;

  const isUserExist = await User.findById(id);

  if (!isUserExist) {
    return res.status(401).json({ message: "Unauthorized" });
}

  req.user = decoded

  next()
}

module.exports = jwtCheck;