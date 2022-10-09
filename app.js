const express = require('express')
const app = express()
const cors = require('cors')
const authRoute = require('./express-router/AuthRoute')
const todolistRouter = require('./express-router/todolistRoute')

app.use(cors())
app.use('/auth', authRoute)
app.use('/todo-lists', todolistRouter)

app.use((req, res) => {
    res.sendStatus(404)
})

app.listen(3005)

// const mongoose = require('mongoose')
//
// const main = async () => {
//     await mongoose.connect('mongodb://localhost:27017/test')
//
// }
// main().then(()=>{
//     const kittySchema = new mongoose.Schema({name: String})
//     kittySchema.methods.speak = function speak() {
//         const greeting = this.name
//             ? 'Meow name is' + this.name
//             : "i don't have a name"
//         console.log(greeting)
//     }
//     const Kitten = mongoose.model('Kitten', kittySchema)
//     const silence = new Kitten({name: 'silence'})
//     silence.save()
//     console.log(silence.name)
//     console.log(silence.speak())
// }).catch((e) => {
//     console.log("e")
//
// })