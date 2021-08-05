const axios = require('axios')
const product = require('../Models/productsModels')
const accessToken = require('../Models/accessTokenModel')
const encrypt = require('../Utils/encrypt')
require('dotenv').config()


createProduct =(req,res)=>{
    var name=req.body.name;
    var price=req.body.price;
    var catagories=req.body.catagories;
    var weight=req.body.weight;
    var type=req.body.type; 
    const newProduct = new product({name,price,catagories,weight,type})
    newProduct.save()
        .then(()=>{
            console.log('inside')
            accessToken.findById('610a7727edbd3033ec8efe12').then(access=>{
                console.log('access'+access)
                const accessToken=access.access_token
                const decryptedToken=encrypt.decrypt(accessToken)
                console.log(decryptedToken)
                const store = access.context;
                console.log(store)
                const config = {
                    
                    method: 'POST',
                    headers: { 
                        'X-Auth-Token':decryptedToken,
                        'Accept': 'application/json',
                        'Content-Type':'application/json'
                    },
                    data : req.body,
                    url: `https://api.bigcommerce.com/${store}/v3/catalog/products`

                }
                try{
                axios(config)
                    .then(response=>{
                        res.json({message:'success'})
                    })
                    .catch(err=>{res.json({message:'failed',err})})
                }
                catch(err){
                    res.json(err)
                }

            
                
            })
            
        })
        .catch(err=>{console.log('error');res.json({error:err})})
}

updateProduct = async(req,res)=>{
    var name=req.body.name;
    var price=req.body.price;
    var weight=req.body.weight;
    var type=req.body.type;
    var currentProduct=await product.findById(req.query.id)
    console.log('current product '+currentProduct)
    currentProduct.name=name;
    currentProduct.price=price;
    currentProduct.weight=weight;
    currentProduct.type=type;
    currentProduct.save()
    const access=await accessToken.findById('610a7727edbd3033ec8efe12')
        console.log('access'+access)
        console.log(access.access_token)
        const decryptedToken=encrypt.decrypt(access.access_token)
        console.log(decryptedToken)
        const config = {
            method: 'PUT',
            headers: {
                'X-Auth-Token':decryptedToken,
                'Accept': 'application/json',
                'Content-Type':'application/json'
            },
            data : req.body,
            url: `https://api.bigcommerce.com/${process.env.store}/v3/catalog/products/116`
        }
        try{
            axios(config)
            .then(response=>{
                res.json({message:'success'})
            })
            .catch(err=>{res.json({message:'failed',err})})
            
        }
        catch(err){
            res.json({message:err})
        }

}

deleteProduct = async(req,res)=>{
    var id=req.query.id;
    await product.findByIdAndDelete(id)
    const access=await accessToken.findById('610a7727edbd3033ec8efe12')
    const decryptedToken=encrypt.decrypt(access.access_token)
    //console.log(decryptedToken)
    const config = {           
        method: 'DELETE',
        headers: { 
            'X-Auth-Token':decryptedToken,
            'Accept': 'application/json',
            'Content-Type':'application/json'
        },
        url: `https://api.bigcommerce.com/${process.env.store}/v3/catalog/products/116`
    }
    try{
        axios(config)
            .then(response=>{
                res.json({message:'success'})
            })
            .catch(err=>{res.json({message:'failed',err})})
            
    }
    catch(err){
        res.json({message:err})
    }
    
}

readProduct = async(req,res)=>{
    const access=await accessToken.findById('610a7727edbd3033ec8efe12')
    const decryptedToken=encrypt.decrypt(access.access_token)
    console.log(decryptedToken)
    const config = {
        method: 'GET',
        headers: {
            'X-Auth-Token':decryptedToken,
        },
        url: `https://api.bigcommerce.com/${process.env.store}/v3/catalog/products/115`
    }
    const allProdcuts= await product.find()
    //res.json(allProdcuts)
    try{
        axios(config)
        .then(response=>{
            const result = response.data
            res.json({message:'success', result})
        })
        .catch(err=>{res.json({message:'failed',err})})
        
    }
    catch(err){
        res.json({message:err})
    }
}



module.exports = {createProduct, updateProduct, deleteProduct, readProduct}