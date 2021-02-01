require("dotenv").config();
const user = require('./routes/user');
const logged = require('./routes/logged_user');
const mongoose = require('mongoose');
const express = require('express');
const app = express();

mongoose.connect(process.env.mongodb,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
    .then(()=> console.log('connected to mongoDB'))
    .catch(err => console.error(err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/user', user);
app.use('/logged', logged);


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));