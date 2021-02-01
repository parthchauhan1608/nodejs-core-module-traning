
const express = require('express');
const logger = require('./middleware/logger');
const app = express();
const courses = require('./routes/courses');

console.log(`NODE_ENV: ${process.env.NODE_ENV}`);//env is enviroment variable
console.log(`app:${app.get('env')}`);

app.use(express.json());
// middleware parse incomming request
app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'));
app.use('/api/courses',courses);
//custom middleware
app.use(logger.log);
app.use(logger.auth);

app.get('/',(req, res)=>{
    res.send('Hello Parth');
});

const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`Listening on ${port}.....`));