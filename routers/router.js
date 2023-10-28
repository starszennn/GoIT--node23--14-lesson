const { Router } = require('express');
const { Product } = require('../models/product.model');
const { User } = require('../models/users.model');
const bcrypt = require('bcrypt');
const jwtCheck = require('../middlewares/jwt.middleware')
const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET = process.env.JWT_SECRET;

const router = Router();

router.get("/", jwtCheck, async (req, res) => {
  try {
    const result = await Product.find();
    res.json(result).status(200);
  } catch (error) {
    throw new Error(error.message);
  }
});

router.post("/product", async (req, res) => {
  const body = req.body;
  try {
    const result = await Product.create(body);
    
    res.send(result);
  } catch (error) { 
    res.send({message: error.message})
  }
});

router.post("/auth/register", async (req, res) => {
  const body = req.body;

  try {
    const candidate = await User.findOne({ login: body.login });

    if (!candidate) {
      const hashedPassword = bcrypt.hashSync(body.password, 10);
      const data = {...body, password: hashedPassword}
        
      const user = await User.create(data);

      return res.status(201).json(user);
    }

    res.status(401).json({message: "User is already exist"});
  } catch (error) { 
    res.json({ message: error.message });
  }
});

router.post("/auth/login", async (req, res) => {
  const body = req.body;

  const candidate = await User.findOne({ login: body.login });

  if (!candidate) {
    return res.status(401).json({ message: "User does not exist" })
  }

  const isPasswordCorrect = bcrypt.compareSync(
    body.password,
    candidate.password
  );

  if (!isPasswordCorrect) {
    return res.status(401).json({ message: "Wrong password" })
  };

  const payload = { id: candidate.id }
  const token = jwt.sign(payload, SECRET, {expiresIn: "1h"});
  

  res.status(200).json({ token });
});

module.exports = router;