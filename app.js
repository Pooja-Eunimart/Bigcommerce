const express = require('express')
const mongoose = require('mongoose')

const db=require('./Utils/database')

const accessToken = require('./Routes/accessToken')
const product = require('./Routes/product')


const app = express()
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    res.send('Hello world')
})

app.use('/oauth',accessToken);
app.use('/products',product)

app.listen(3000,()=>{
    console.log('Server running at port 3000')
})
