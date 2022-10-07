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