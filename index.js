const express = require('express')
const usersRouter = require('./routers/user_route')
const postsRouter = require('./routers/post_route')

const app = express()
const port = 3000;

app.use(express.json())

app.use('/users',usersRouter);
app.use('/posts',postsRouter);

app.listen(port, () => {
    console.log(`example app listening on port ${port}`)
})