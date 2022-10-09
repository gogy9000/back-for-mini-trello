const {responseCreator, errorCreator} = require('../../utils/responseCreators')
const {mongoose} = require('./index')
mongoose.connect('mongodb://localhost:27017/todolist')

const todolistSchema = new mongoose.Schema({title: String,})
const TodolistModel = new mongoose.model('todolist', todolistSchema)

const getTodoLists = async () => {
    try {
        return await TodolistModel.find()
    } catch (e) {
        return errorCreator(e)
    }
}

const postTodolist = async (title) => {
    try {

        const newTodolist = new TodolistModel({title: title})
        const item = await newTodolist.save()
        console.log(item)
        return responseCreator({item})
    } catch (e) {
        return errorCreator(e)
    }
}
const deleteTodoList = async (id) => {
    try {
        const res = await TodolistModel.deleteOne({_id: id})
        return responseCreator({res})
    } catch (e) {
        return errorCreator({e})
    }
}

const putTodolist = async (payload) => {
    try {
        const res = await TodolistModel.updateOne({_id: payload.id}, {title: payload.title})
        return responseCreator({res})
    } catch (e) {
        return errorCreator({e})
    }
}

exports.deleteTodoList = deleteTodoList
exports.postTodolist = postTodolist
exports.getTodoLists = getTodoLists
exports.putTodolist = putTodolist

