const mongoose = require('mongoose')
require('dotenv').config()
const uri = process.env.uri
console.log(uri)
mongoose.connect(uri,{useCreateIndex:true, useFindAndModify:true, newNewParser:true, useUnifiedTopology:true})
const connection = mongoose.connection
connection.once('open',()=>{
    console.log('MongoDB connected successfully')
})

module.exports = connection;