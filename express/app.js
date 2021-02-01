require("dotenv").config();
const express = require("express");
const app = express();

app.set('port',process.env.port || 8090);

function middleware(req, res, next){
    console.log('Custom middliware...');
    next();
};
function middleware1(req, res, next){
    console.log('Custom middliware1...');
    next();
};
function validate(course){
    let regExpName = /^[a-zA-Z]{2,12}$/;
    console.log(course.name);
    if(!regExpName.test(course.name)){
        return new Error('Require valid course');
    }
}

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true}));
app.use(middleware);
app.use(middleware1);

const courses = [
    { id: 1, name: 'Nodejs'},
    { id: 2, name: 'Angularjs'},
    { id: 3, name: 'Expressjs'},
    { id: 4,name: 'MongoDB'}
];

app.get('/',(req, res)=>{
    console.log(req);
    // console.log(res);
    res.send('Hello Parth');
});
app.get('/courses', (req,res)=>{
    // To read query string parameters (?sortBy=name)
    // const sortBy = req.query.sortBy;
    res.send(courses);
});
app.get('/courses/:id', (req,res)=>{
    console.log(req);
    const course = courses.find(c => c.id == parseInt(req.params.id));
    if(!course){
        return res.status(404).send('The course with id not found');
    }
    res.send(course);
});

app.post('/courses',(req,res)=>{
    console.log(req);
    const error =validate(req.body);
    if(error){
        console.log('error');
        return res.status(400).send(error.message);
    }  
        
    const course = {
        id: courses.length+1,
        name: req.body.name
    };
    courses.push(course);
    res.send(courses);
    
});

app.put('/courses/:id', (req,res)=>{
    console.log(req);
    const course = courses.find(c => c.id == parseInt(req.params.id));
    
    if(!course){
        return res.status(404).send('The course with id not found');
    }
    
    const error =validate(req.body);
    if(error){
        console.log('error');
        return res.status(400).send(error.message);
    }  
        
    
    course.name = req.body.name;
    res.send(course);
});

app.delete('/courses/:id', (req,res)=>{
    console.log(req);
    const course = courses.find(c => c.id == parseInt(req.params.id));
    
    if(!course){
        return res.status(404).send('The course with id not found');
    }

    const index = courses.indexOf(course);
    courses.splice(index,1);
    res.send(courses);
});

// const port = process.env.PORT || 3001;
app.listen(app.get('port'), ()=> console.log(`Listening on ${app.get('port')}.....`));