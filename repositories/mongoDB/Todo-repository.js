const {responseCreator, errorCreator} = require('../../utils/responseCreators')
const {mongoose} = require('./index')
const {TaskListModel}=require('./Task-repository')
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
        return responseCreator({item})
    } catch (e) {
        return errorCreator(e)
    }
}
const deleteTodoList = async (id) => {
    try {
        const responseTodo = await TodolistModel.deleteOne({_id: id})
        if(responseTodo.acknowledged){
          const responseTasks=await TaskListModel.remove({todoListId:id})
            return responseCreator({responseTodo,responseTasks})
        }else {
            errorCreator(String(acknowledged))
        }
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

