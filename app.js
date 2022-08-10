const express = require('express')
const mongoose = require('mongoose')
require('dotenv/config')

const postsRoute = require('./posts/post')

const app = express()

//middlewares
app.use(express.json())
app.use(express.urlencoded({extended:false}))


//Routes
/**
 * Method: GET
 * Purpose: Home page
 */
app.get('/',(req,res)=>{
    res.send('we are home')
})


// route specific middleware
app.use('/post',postsRoute);

// Connect to MongoDB
mongoose.connect(process.env.DB_CONNECTION,(err)=>{
    if(err){
        return console.log(err);
    }
    console.log('Connected to DB!');
})


//Listen server
app.listen(5000,()=>{
    `Server listenin on port:5000`
})