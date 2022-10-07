const express = require('express');
const bodyParser = require("body-parser");
const todolist = express.Router()
const jsonParser = bodyParser.json()
const {postTodolist,getTodoLists,deleteTodoList, putTodolist}=require('../repository')

todolist.get('/',async (req,res)=>{
    try {
      const result= await getTodoLists()
      res.send(result)
    }catch (e) {
        console.log(e)
    }
})

todolist.post('/', jsonParser, async (req, res) => {
    if (Object.keys(req.body).length !== 0) {
        if (req.body.title.length !== 0) {
            console.log(req.body)
            const response = await postTodolist(req.body.title)
            console.log(response)
            res.send(response)
        } else {
            res.send(404)
        }
    } else {
        res.send(404)
    }
})
todolist.delete('/:todolistId',async (req,res)=>{
    try {
        const result= await deleteTodoList(req.params.todolistId)
        res.send(result)
    }catch (e) {
        res.send(404)
    }
})

todolist.put('/:todolistId',jsonParser,async (req,res)=>{
    try {
        const result=await putTodolist({id:req.params.todolistId, title:req.body.title})
        res.send(result)
    }catch (e) {
        res.send(404)
    }
})

module.exports=todolist