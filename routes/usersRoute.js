const Router=require('koa-router')
const {getUsers, createUser} = require("../repositories/todolist-repository");
const koaBody = require("koa-body");

const users=new Router()

users.get('/users',async (ctx)=>{
    try {
        ctx.body = await getUsers()
    } catch (e) {
        ctx.body='some error'
    }
})

users.post('/users',koaBody(),async (ctx)=>{
    try {
        const response= await  createUser(ctx.request.body)
        ctx.body=JSON.stringify({response: response})
    }catch (e) {
        ctx.body=JSON.stringify({response: e})
    }
})

exports.users=users