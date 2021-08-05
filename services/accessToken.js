const axios = require('axios');
const accessToken = require('../Models/accessTokenModel')
const encrypt = require('../Utils/encrypt')
const bcrypt = require('bcryptjs')

getAccessToken=(req,res)=>{
    console.log(req.query)
    const client_id = process.env.client_id
    const client_secret = process.env.client_secret
    const code = req.query.code
    const context = req.query.context
    const scope = req.query.scope
    const redirect_url='https://53789dd0988f.ngrok.io/oauth'
    const url=`https://login.bigcommerce.com/oauth2/token?client_id=${client_id}&client_secret=${client_secret}&code=${code}&scope=${scope}&grant_type=authorization_code&redirect_uri=${redirect_url}&context=${context}`
    try{
        axios.post(url)
        .then(result=>{
            console.log(result.data)
            //res.json(result.data)
            const access_token = result.data.access_token
            const user = result.data.user
            const context = result.data.context

            const hashedAccessToken = encrypt.encrypt(access_token);
            const original = encrypt.decrypt(hashedAccessToken)
            console.log(hashedAccessToken)
            console.log(original)

            const currentAccessToken = new accessToken({access_token:hashedAccessToken,user,context})
            currentAccessToken.save()
                .then(()=>{
                    res.json({message:'success', currentAccessToken})
                })
                .catch(err=>{res.json({error:err})})        
        })
        .catch(err=>{res.json({error:err})})
        
    }
    catch(err){
        console.log(err)
        res.json({message:'error'},err)
    }

}

module.exports={
    getAccessToken
}