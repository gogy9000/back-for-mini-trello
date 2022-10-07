const fs=require('fs')

exports.readJsonFromFile=(filePath)=> new Promise(
    (resolve,reject) => {
        fs.readFile(filePath,(err,buf) =>{
            if(err){
                reject(err)
            }else {
                resolve(JSON.parse(buf.toString()))
            }
        })
    })
exports.writeJsonToFile=(FilePath, stringifyUsers)=>new Promise((res, rej)=>{
    fs.writeFile(FilePath,JSON.stringify(stringifyUsers) , (err)=>{
        if(err) {
            rej({err:err, result:false})
        }else {
            res({err:[],result:true})
        }
    })
})