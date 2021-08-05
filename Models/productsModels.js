const mongoose = require('mongoose');
const Schema = mongoose.Schema

const productSchema = new Schema({
    name:{type:"string", required:true},
    price:{type:"string", required:true},
    catagories:{
        type:"array",
        items:{
            type:"number",
            
        },
        required:true
    },
    weight:{type:"number", required:true},
    type:{type:"string", required:true}
},{
    timestamps:true
})

const product=mongoose.model('product',productSchema)
module.exports=product