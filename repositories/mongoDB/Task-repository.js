const {responseCreator, errorCreator} = require('../../utils/responseCreators')
const {mongoose} = require('./index')

mongoose.connect('mongodb://localhost:27017/todolist')

const task = {
    title: String,
    todoListId: String,
    status: Number,
}

const tasksListSchema = new mongoose.Schema(task)
const TaskListModel = new mongoose.model('tasksList', tasksListSchema)

exports.getTasks = async (todoListId) => {
    try {
        const tasks = await TaskListModel.find({todoListId})
        if (tasks === null) {
            return {resultCode: 0, items: []}
        }
        return {resultCode: 0, items: tasks}
    } catch (e) {
        return errorCreator(e)
    }
}
exports.postTask = async (payload) => {
    try {
        const newTask = new TaskListModel({
            title: payload.title,
            todoListId: payload.todolistId,
            status: 0
        })
        const res = await newTask.save()
        return responseCreator({item: res})
    } catch (e) {
        return errorCreator(e)
    }
}
exports.deleteTask=async ({todoListId, id})=>{
    try {
        const res= await TaskListModel.deleteOne({_id:id,todoListId})
        return responseCreator(res)
    }catch (e) {
        return errorCreator(e)
    }
}
exports.putTask=async ({todoListId, id, payload})=>{
    try {
        const res=await TaskListModel.findOneAndUpdate(
            {todoListId,_id:id},
            {title:payload.title,status:payload.status},
            {returnDocument:"after"}
        )
        console.log(res)
        return responseCreator({item: res})
    }catch (e) {
        return errorCreator(e)
    }
}
exports.TaskListModel=TaskListModel