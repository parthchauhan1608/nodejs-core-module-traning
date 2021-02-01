require("dotenv").config();
const mongoose = require('mongoose');
const users = require('./routes/user');
const logged = require('./routes/logged');

const auth = require('./routes/authenticate');
const express = require('express');
const app = express();


mongoose.connect('mongodb://localhost/auth',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
    .then(()=> console.log('connected to mongoDB'))
    .catch(err => console.error('could not connect to mongodb'));

app.use(express.json());
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/change', logged);


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));