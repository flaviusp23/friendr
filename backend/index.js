const express = require('express')
const usersRouter = require('./routers/user_route')
const postsRouter = require('./routers/post_route')
const mongoose = require('mongoose')
const cors = require('cors');

const app = express()
const port = 3000;

//TODO REMOVE

app.use(express.json())
app.use(cors())


app.use('/users',usersRouter);
app.use('/posts',postsRouter);

app.listen(port, () => {
    console.log(`example app listening on port ${port}`)
    mongoose
        .connect('mongodb+srv://flaviuspaltin599:1234@cluster0.ae1qz3q.mongodb.net/friendr?retryWrites=true&w=majority&appName=Cluster0')
        .then(() => {
            console.log("Connected to DB and listening to port 3000")
            const Cat = mongoose.model('Cat', {name : String});
            const Kitty = new Cat({name:'Zildjilan'});
            Kitty
                .save()
                .then(()=> console.log('meow'));
            })
        .catch((err) => console.log(err))
})