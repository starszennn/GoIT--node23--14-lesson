const express = require('express');
require('dotenv').config();
const router = require('./routers/router');

const PORT = process.env.PORT || 5001

const app = express();

app.use(express.json());
app.use(router);

app.listen(PORT, () => {
  console.log(`Our server is running on the port ${PORT}`);
})