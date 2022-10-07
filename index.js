const Koa=require('koa')
const cors=require('@koa/cors')
const {users}=require('./routes/usersRoute')
const app= new Koa()

app.on('error',(err)=>{
    console.log('server error', err)
})

app.use(async (ctx,next)=>{

    await next()
    const rt=ctx.response.get('X-Response-Time')
    console.log(`${ctx.method}${ctx.url} ${rt}`)
})
app.use(cors())
app.use(users.routes())
app.use(users.allowedMethods())
app.use(async (ctx,next)=>{
    const start=Date.now()
    await next()
    const ms=Date.now()-start
    ctx.set('X-Response-Time',`${ms}ms`)
})
app.listen(3005)

// const {usersController} = require("./usersController");
// const port = 3007
// const hostname = "127.0.0.1"
// //
// // process.on('unhandledRejection', (reason,p)=>{
// //     console.log([reason,p])
// // })
//
// let cors=(res,req)=>{
//     res.setHeader('Access-Control-Allow-Origin', '*')
//     res.setHeader('Access-Control-Request-Method', '*')
//     res.setHeader('Access-Control-Allow-Methods', 'OPTIONS,GET')
//     res.setHeader('Access-Control-Allow-Headers', '*')
//     if (req.method === 'OPTIONS') {
//         res.writeHead(200)
//         res.end
//         return true
//     }
//     return false
// }
//
//
//
// const server = http.createServer((req, res) => {
//     console.log("coonect")
//     debugger
//     if(cors(res,req)){return}
//
//     switch (req.url) {
//         case "/users":
//             usersController(req,res)
//             break
//         default:
//             res.write(`<h1>page not found ypt</h1>`)
//             res.end()
//     }
// })
//
// server.listen(port, hostname,
//     () => {
//         console.log(`Server running at http://${hostname}:${port}/`)
//     }
// )
