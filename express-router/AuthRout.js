
const express = require('express');
const bodyParser = require("body-parser");
const authRouter = express.Router();
const jsonParser = bodyParser.json()

authRouter.get('/me',(req,res)=>{
    res.send({email: "string", id: "string", login: "string",resultCode:0})
})

module.exports=authRouter