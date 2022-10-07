const express = require('express');
const bodyParser = require("body-parser");
const todolist = express.Router()
const jsonParser = bodyParser.json()
const {postTodolist, getTodoLists, deleteTodoList, putTodolist} = require('../repositories/todolist-repository')
const {getTasks, postTask, deleteTask, putTask} = require("../repositories/tasks-repository");

todolist.get('/', async (req, res) => {
    try {
        const result = await getTodoLists()
        res.send(result)
    } catch (e) {
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
todolist.delete('/:todolistId', async (req, res) => {
    try {
        const result = await deleteTodoList(req.params.todolistId)
        res.send(result)
    } catch (e) {
        res.send(404)
    }
})

todolist.put('/:todolistId', jsonParser, async (req, res) => {
    try {
        const result = await putTodolist({id: req.params.todolistId, title: req.body.title})
        res.send(result)
    } catch (e) {
        res.send(404)
    }
})
todolist.get('/:todolistId/tasks', jsonParser, async (req, res) => {
    try {
        const result = await getTasks(req.params.todolistId)
        if (result.resultCode === 0) {
            res.send(result)
        } else {
            res.sendStatus(404)
        }

    } catch (e) {
        res.send(404)
    }
})
todolist.post('/:todolistId/tasks', jsonParser, async (req, res) => {
    try {
        const result = await postTask({todolistId: req.params.todolistId, title: req.body.title})
        res.send(result)
    } catch (e) {
        res.send(404)
    }
})
todolist.delete('/:todolistId/tasks/:taskId', async (req, res) => {
    try {
        const result = await deleteTask({todoListId: req.params.todolistId, id: req.params.taskId})
        res.send(result)
    } catch (e) {
        res.send(404)
    }
})
todolist.put('/:todolistId/tasks/:taskId', jsonParser, async (req, res) => {
    try {
        const result=await putTask({
            todoListId: req.params.todolistId,id: req.params.taskId,payload:req.body
        })
        res.send(result)
    } catch (e) {
        res.send(404)
    }
})


module.exports = todolist