const express=require('express')
const router = express.Router()
const product = require('../services/product')

router.post('/createProduct',(req,res)=>{
    product.createProduct(req,res)
})

router.put('/updateProduct',(req,res)=>{
    product.updateProduct(req,res)
})

router.delete('/deleteProduct',(req,res)=>{
    product.deleteProduct(req,res)
})

router.get('/readProduct',(req,res)=>{
    product.readProduct(req,res)
})



module.exports = router;