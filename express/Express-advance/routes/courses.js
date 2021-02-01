
const express = require('express');
const Joi = require('joi')
const router = express.Router();

const courses = [
    { id: 1, name: 'Java'},
    { id: 2, name: 'HTML'},
    { id: 3, name: 'CSS'},
    { id: 4, name: 'JS'},
    { id: 5, name: 'AJS'}
];

router.get('/', (req, res)=>{
    res.send(courses);
});
router.get('/:id',(req, res)=>{
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('The course with given id not found');
    res.send(course);
}); 
router.post('/',(req, res)=>{
    const { error } =validaate(req.body);
    if(error)  return res.status(400).send(result.error.details[0].message);

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(courses);
});
router.put('/:id', (req, res) =>{
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('The course with given id not found');
    
    const { error } =validaate(req.body);
    if(error) return res.status(400).send(result.error.details[0].message)

    course.name = req.body.name;
    res.send(course);
});
router.delete('/:id', (req,res) =>{
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('The course with given id not found');

    const index = courses.indexOf(course);
    courses.splice(index, 1);
    res.send(courses);
});
function validaate(course){
    const schema = {
        name: Joi.string().min(2).required()
    };
    return Joi.validate(course, schema);
}

module.exports = router;