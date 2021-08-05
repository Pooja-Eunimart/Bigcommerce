const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const accessTokenSchema =  new Schema({
    access_token:{
        type:"object",
        properties:{
            iv:{type:"string", required:true},
            encryptedData:{type:"string", required:true}

        },
        required: true
    },
    user:{
        type:"object",
        propertis:{
            id:{type:"number", required:true},
            username:{type:"string", required: true},
            email:{type:"string", required: true}
        },
        required:true
    },
    context:{type:"string", required:true}
},{
    timestamps:true
})

const accessToken = mongoose.model('accessToken', accessTokenSchema)

module.exports = accessToken;