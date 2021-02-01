require("dotenv").config();
const users = require('./routes/user');
const login = require('./routes/login');
const logged = require('./routes/authorized');
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

app.use('/api/users', users);
app.use('/api/users/login', login);
app.use('/api/users/logged', logged);


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));