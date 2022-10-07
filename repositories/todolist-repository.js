const {writeJsonToFile, readJsonFromFile} = require('../utils/fsUtils')
const {v1} = require('uuid')
const {responseCreator, errorCreator} = require('../utils/responseCreators')

const getTodoLists = async () => {
    try {
        return await readJsonFromFile('./DB/todo-lists.json')
    } catch (e) {
        return errorCreator(e)
    }
}

const postTodolist = async (title) => {
    try {
        const newTodoListId = v1()
        const item = {
            id: newTodoListId,
            title: title,
        }
        const todoList = await readJsonFromFile('./DB/todo-lists.json')
        todoList.push(item)
        const response = await writeJsonToFile('./DB/todo-lists.json', todoList)
        if (response.result) {
            const allTasks = await readJsonFromFile('./DB/tasks.json')
            allTasks[newTodoListId] = []
            const response = await writeJsonToFile('./DB/tasks.json', allTasks)
            if (response.result) {
                return responseCreator({item})
            } else {
                return errorCreator('some error in db')
            }
        } else {
            return errorCreator('some error in db')
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
                const allTasks = await readJsonFromFile('./DB/tasks.json')
                delete allTasks[id]
                const response = await writeJsonToFile('./DB/tasks.json',allTasks)
                if(response.result){
                    return responseCreator()
                }else {
                    return errorCreator(response.err)
                }
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



