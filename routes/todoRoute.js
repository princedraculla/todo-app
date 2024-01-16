import {Router} from 'express'
import * as controller from '../controller/todos.js'
const route = Router()


route.get('/api/todo/list/:userId', controller.allTodos)
route.post('/api/todo/create/:userID', controller.createTodo)
route.patch('/api/todo/update/:userID', controller.updateTodo)




export { route}