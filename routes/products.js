const express = require('express') ;
const {asyncWrapper} = require('../utilis/asyncWrapper');
const route = express.Router() ;

const {getAllProductsStatic , getAllProducts}  = require('../controllers/products')

route.get('/' , asyncWrapper(getAllProducts)) ;

route.get('/static' , asyncWrapper(getAllProductsStatic));









module.exports = route ;