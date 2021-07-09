const express = require("express");
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

// Routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');
const recipeRoute = require('./routes/recipe');

//Connect to DB
mongoose.connect(
    process.env.DB_CONNECTION, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    () => console.log('connected to DBB'));

//Middleware
app.use(express.json());

// Route Middlewares
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);
app.use('/api/recipe', recipeRoute);

app.listen(3000, () => console.log("hurray"));