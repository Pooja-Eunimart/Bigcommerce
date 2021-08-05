const express = require('express')
const router = express.Router()
const accessToken = require('../services/accessToken')


router.get('/',(req,res)=>{
    
    accessToken.getAccessToken(req,res)
})

module.exports = router