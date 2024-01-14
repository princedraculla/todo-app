const express = require('express')
const route = require('./userRoute')



const app = express()

app.use(express.json())


const allRouters = [
    [require('./userRoute')]
]

for (const router of allRouters){
    app.use(router[0])
}

module.exports = app
