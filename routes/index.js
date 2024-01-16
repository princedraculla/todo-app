import  express  from 'express'
import * as userRoute from './userRoute.js'
import * as todoRoute from './todoRoute.js'
import * as authRoute from './authRoute.js'

const app = express()

app.use(express.json())


const allRouters = [
    [userRoute.route],
    [todoRoute.route],
    [authRoute.authRoute]
]

for (const router of allRouters){
    console.log(router);
    app.use(router)
}
export  {app}
