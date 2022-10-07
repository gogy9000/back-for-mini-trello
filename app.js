const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
// const todolistRouter = require('./express-router/router')
const authRoute = require('./express-router/AuthRout')
const todolistRouter = require('./express-router/todolistRout')


// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({extended: false})

app.use(cors())
// app.use('/users',userRoute)
app.use('/auth', authRoute)
app.use('/todo-lists', todolistRouter)

app.use((req, res) => {
    res.sendStatus(404)

})

app.listen(3005)