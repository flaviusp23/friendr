const express = require('express')
const usersRouter = require('./routers/user_route')

const app = express()
const port = 3000;

app.use(express.json())

app.use('/users',usersRouter);

app.listen(port, () => {
    console.log(`example app listening on port ${port}`)
})