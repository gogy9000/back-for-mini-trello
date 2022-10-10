mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/todolist',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
)
module.exports = mongoose