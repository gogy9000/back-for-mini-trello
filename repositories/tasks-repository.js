const {writeJsonToFile, readJsonFromFile} = require('../utils/fsUtils')
const {v1} = require('uuid')
const {responseCreator, errorCreator} = require('../utils/responseCreators')

exports.getTasks = async (todolistId) => {
    try {
        const allTasks = await readJsonFromFile('./DB/tasks.json')
        if (allTasks[todolistId]) {
            return {resultCode: 0, items: allTasks[todolistId]}
        } else {
            return errorCreator("no tasks")
        }
    } catch (e) {
        return errorCreator(e)
    }
}

exports.postTask = async (payload) => {
    try {
        const allTasks = await readJsonFromFile('./DB/tasks.json')
        if (allTasks[payload.todolistId]) {
            const task = {
                title: payload.title,
                id: v1(),
                todoListId: payload.todolistId,
                status: 0
            }
            allTasks[payload.todolistId].push(task)
            const response = await writeJsonToFile('./DB/tasks.json', allTasks)
            if (response.result) {
                return responseCreator({item: task})
            } else {
                return errorCreator('response.err')
            }
        } else {
            return errorCreator('some problem with db')
        }
    } catch (e) {
        return errorCreator(e)
    }
}

exports.deleteTask = async ({todoListId, id}) => {
    try {
        const allTasks = await readJsonFromFile('./DB/tasks.json')
        if (allTasks[todoListId]) {
            allTasks[todoListId] = allTasks[todoListId].filter(el => el.id !== id)
            const response = await writeJsonToFile('./DB/tasks.json', allTasks)
            if (response.result) {
                return responseCreator()
            } else {
                return errorCreator('some problem with db')
            }
        } else {
            return errorCreator('invalid todoListId')
        }
    } catch (e) {
        return errorCreator(e)
    }
}

exports.putTask = async ({todoListId, id, payload}) => {
    try {
        const allTasks = await readJsonFromFile('./DB/tasks.json')
        if (allTasks[todoListId]) {
            const task = allTasks[todoListId].find(el => el.id === id)
            if (task) {
                const updatedTask = {...task, title: payload.title, status: payload.status}
                const response = await writeJsonToFile('./DB/tasks.json', allTasks)
                if (response.result) {
                    return responseCreator({item: updatedTask})
                } else {
                    return errorCreator('some problem with db')
                }
            }
        } else {
            return errorCreator('invalid todoListId')
        }

    } catch (e) {
        return errorCreator('invalid todoListId')
    }
}