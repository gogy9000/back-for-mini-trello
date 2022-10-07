const {writeJsonToFile, readJsonFromFile} = require('./fsUtils')
const {v1} = require('uuid')

const responseCreator = (data) => {
    if (data) {
        return {
            resultCode: 0,
            messages: [],
            data
        }
    } else {
        return {
            resultCode: 0,
            messages: [],
            data: {}
        }
    }
}
const errorCreator = (err) => {
    if (err) {
        return {
            resultCode: 1,
            messages: [err],
            data: {}
        }
    } else {
        return {
            resultCode: 1,
            messages: [],
            data: {}
        }
    }
}

const getTodoLists = async () => {
    try {
        return await readJsonFromFile('./DB/todo-lists.json')
    } catch (e) {
        return errorCreator(e)
    }
}

const postTodolist = async (title) => {
    try {
        const item = {
            id: v1(),
            title: title,
        }
        const todoList = await readJsonFromFile('./DB/todo-lists.json')
        todoList.push(item)
        const response = await writeJsonToFile('./DB/todo-lists.json', todoList)
        if (response.result) {
            return responseCreator({item})
        } else {
            return errorCreator(response.err)
        }
    } catch (e) {
        return errorCreator(e)
    }
}
const deleteTodoList = async (id) => {
    try {
        const todoLists = await readJsonFromFile('./DB/todo-lists.json')
        const todo = todoLists.filter(el => el.id !== id)
        if (todo) {
            const response = await writeJsonToFile('./DB/todo-lists.json', todo)
            if (response.result) {
                return responseCreator()
            } else {
                return errorCreator(response.err)
            }
        } else {
            return errorCreator('todo not found')
        }
    } catch (e) {
        return errorCreator({e})
    }
}

const putTodolist = async (payload) => {
    try {
        const todoLists = await readJsonFromFile('./DB/todo-lists.json')
        const newTodoLists = todoLists.map(el => el.id === payload.id ? {id: el.id, title: payload.title} : el)
        const response = await writeJsonToFile('./DB/todo-lists.json', newTodoLists)
        if (response.result) {
            return responseCreator()
        } else {
            return errorCreator(response.err)
        }
    } catch (e) {
        return errorCreator({e})
    }
}

exports.deleteTodoList = deleteTodoList
exports.postTodolist = postTodolist
exports.getTodoLists = getTodoLists
exports.putTodolist = putTodolist



