
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground',{
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
    .then(()=> console.log('connected to mongoDB'))
    .catch(err => console.error('could not connect to mongodb'));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    // date: { type: Date, default: Date.now},
    isPublished: Boolean
},{ timestamps: true });

const Course = mongoose.model('course',courseSchema);

// for creating or insurting dta
// async function createCourse(){
//     const course = new Course({
//         name: 'node.js',
//         author: 'parth',
//         tags: ['Angular', 'Frontend'],
//         isPublished: true
//     }); 
//     const result = await course.save();
//     console.log(result) 
// }
// createCourse();

//getting data from database
//async function getCourses(){
    //here we also have
    // eq (queal)
    // ne (not equal)
    // gt (greater than)
    // gte (greater than equal)
    // lt (less than)
    // lte (less than equal)
    // in
    // nin (not in)
    // this all are use for access number in database like
    // const courses = await Course.find({ prise: { $gt: 10, $lte:20 }}) result between 10-20
                                //  .find({ prise: { $in: [10, 15, 20]}) result are with prise of 10,15,20


    //logical operator or,and
    // .find().or([{ Author: 'parth},{isPublished: true}])
    // .find().and([{author:'parth'}, {isPublished: true}])


    //const courses = await Course.find();//for find all data
    
    // const courses = await Course
    //     .find({author:'parth', isPublished: true})//only find author is parth and isPublished is true
    //     .limit(10) //only 10 dta find snd get
    //     .sort({ name: 1 })//for sorting if 1 than assending order and -1 for dessending order
    //     .select({ name: 1, tag: 1})////only selected property and geted
    //     .count();//give a number of document which has this filter
    //     console.log(courses);
    

    //regular expression
    // author Start with "par"
    //const courses = await Course.find( {author : /^par/});//here /^pattern/ define
    //End with "th"
    //const courses = await Course.find( {author : /th$/i});//here i indicate case insensetive 
    //author contain "rt"
    //const courses = await Course.find( {author : /.*rt*/i});
//}
//getCourses();

async function getCoursesById(id){
    const course = await Course.find({ _id : id}).lean();
    console.log(course);
}
getCoursesById('5f743908e32e4b24de33c6e8');


//Update database
// async function UpdateCourse(id){
//     const result = await Course.update({ _id:id },{
//         $set: {
//             author:'Parth Chauhan',
//             isPublished: false
//         }
//     });
//     console.log(result);
// }

// UpdateCourse('5f7438e347071624c844ca48');

//Remove Data
// async function removeCourse(id){
//     const result = await Course.deleteOne({_id:id});
//     console.log(result);
// }

// removeCourse('5deca2905fa2fa12407b14ed');