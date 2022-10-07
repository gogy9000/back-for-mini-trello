
const express = require('express');
const bodyParser = require("body-parser");
const router = express.Router();
const jsonParser = bodyParser.json()

router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    console.log(req.query)
    next();
});

router.get('/',async (req,res)=>{
    try {


    } catch (e) {
        res.error()
    }
})

router.post('/',jsonParser,async (req,res)=>{
    try {
        // const response= await  createUser(req.body)
        // res.send({response: response})
    }catch (e) {
        res.send({response: e})
    }
})
router.get('/:userId',async (req,res)=>{
    try {

        const users=[]
        const user=JSON.parse(users).find(el=>el.id===+req.params.userId)
        if (user){
            res.send(user)
        }else {
            res.send({message:'user not found'})
            res.sendStatus(404)
        }

    }catch (e) {
        res.send({message:'some error'})
        res.sendStatus(404)
    }
})

module.exports = router;