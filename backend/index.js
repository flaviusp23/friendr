const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:4200',
    credentials: true,
  })
);

app.use('/users', require('./routers/user_route'));
app.use('/posts', require('./routers/post_route'));
app.use('/comments', require('./routers/comment_route'));
app.use('/auth', require('./middleware/auth'));

mongoose
  .connect('mongodb+srv://flaviuspaltin599:1234@cluster0.ae1qz3q.mongodb.net/friendr?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  })
  .catch((err) => console.error('Error connecting to MongoDB:', err));

