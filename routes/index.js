import  express  from 'express'
import * as userRoute from './userRoute.js'
import * as todoRoute from './todoRoute.js'
import * as authRoute from './authRoute.js'

const app = express()

app.use(express.json())

/**
 * array for containing one place of Routers
 */
const allRouters = [
    [userRoute.route],
    [todoRoute.route],
    [authRoute.authRoute]
]
/**
 * iterate each elemnet of Router Array 
 * use them all in one for our app
 */
for (const router of allRouters){
    app.use(router)
}
export  {app}
