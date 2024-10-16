const Product = require('./models/product');
const jsonProducts = require('./products.json') ;
require('dotenv').config();
const mongoose = require('mongoose') ;

mongoose.connect(process.env.MONGO_URI , console.log("connectes to database"));

Product.create(jsonProducts);