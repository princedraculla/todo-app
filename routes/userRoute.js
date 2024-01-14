const {Router} = require('express')
const controller = require('../controller/user')
const route = Router()

    route.get('/api/user/list', controller.allUsers)
    route.post('/api/user/signup', controller.createUser)
    route.delete('/api/user/delete/:id', controller.deleteUser)
    route.patch('/api/user/update/:id', controller.updateInfo)


module.exports = route