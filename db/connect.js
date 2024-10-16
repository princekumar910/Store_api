const mongoose = require('mongoose') 
const express = require('express')
const app = express() ;
const port = process.env.PORT 
async function connectDB(){
  try {
    console.log("connecting to database..")
    await mongoose.connect(process.env.MONGO_URI , {useNewUrlParser: true, 
      useUnifiedTopology: true }
     ) ;
    console.log("connected to database") ;
    app.listen(port, console.log("server is listening"))
  } catch (error) {
      console.log(error);
  }
}


module.exports = {app , connectDB};
