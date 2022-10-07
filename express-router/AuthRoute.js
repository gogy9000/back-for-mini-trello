
const express = require('express');
const authRouter = express.Router();

authRouter.get('/me',(req,res)=>{
    res.send({email: "string", id: "string", login: "string",resultCode:0})
})

module.exports=authRouter