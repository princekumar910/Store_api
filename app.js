require('dotenv').config();
require('express-async-errors')
const {connectDB , app} = require('./db/connect')
const express = require('express') ;

const notFoundMiddleWare = require('./middleware/not-found') ;
const errorMiddleware = require('./middleware/error-handler') ;
const product = require('./routes/products')
// middleWare 
app.use(express.json()) 

// routes 
app.use('/api/v1/products' , product) ;

connectDB() ;

app.get('/' , (req ,res)=>{
    res.send("Hello World")
})

app.use(notFoundMiddleWare);
