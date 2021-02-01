
const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;


MongoClient.connect("mongodb://localhost:27017/relationship", function(err, db) {
  if(err){
    console.log(err)
  }
  db.collection('courses')
  .find({})
  .populate('author').then((data)=>{
    console.log(data);
  })
});


// mongoose.connect('mongodb://localhost/relationship',{
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
//   .then(() => console.log('Connected to MongoDB...'))
//   .catch(err => console.error('Could not connect to MongoDB...', err));

// const Author = mongoose.model('Author', new mongoose.Schema({
//   name: String,
//   bio: String,
//   website: String
// }));

// const Course = mongoose.model('Course', new mongoose.Schema({
//   name: String,
//   author: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Author'
//   }
// }));

// async function createAuthor(name, bio, website) { 
//   const author = new Author({
//     name, 
//     bio, 
//     website 
//   });

//   const result = await author.save();
//   console.log(result);
// }

// async function createCourse(name, author) {
//   const course = new Course({
//     name, 
//     author
//   }); 
  
//   const result = await course.save();
//   console.log(result);
// }

// async function listCourses() { 
//   const courses = await Course
//     .find()
//     .populate({
//       path:'author',
//       match:{ name : new RegExp('.*h.*', 'i') },   //match:{ age: { $gt:18 } }, //options: { limit: 2 }
//       select: 'name website -_id'
//     })
//     // .populate('author','name -_id')
//     .select('name -_id');
//   console.log(courses);
// }

// // createAuthor('Hariom', '____', 'wordpress');

// // createCourse('WEB', '5e39339017d9112f169e8e46');

// listCourses();