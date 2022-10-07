const {createUser, getUsers} = require("./repository");

const usersController = async (ctx) => {
    if (req.method === 'POST') {
        try {

            const response= await  createUser()
            res.write(JSON.stringify({response: response}))
        }catch (e) {
            res.write(JSON.stringify({response: e}))
        }finally {
            res.end()
        }

    } else {
        try {
            const users = await getUsers()
            res.write(users)
        } catch (e) {
            console.log(e)
        } finally {
            res.end()
        }
    }
}
exports.usersController = usersController