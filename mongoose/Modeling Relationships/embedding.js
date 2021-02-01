const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/relationship1',{
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  author: authorSchema
}));

async function createCourse(name, author) {
  const course = new Course({
    name, 
    author
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course.find()
                        .select('-_id author.website author.bio');
  console.log(courses);
}

async function updateAuthor(courseId){
  const course = await Course.updateOne({ _id: courseId },{
    $unset:{
      'author.name': ''
    },
    $set:{
      'author.bio': '----'
    }
  })
  console.log(course);
  /*const course = await Course.findById(courseId);
  course.author.name = 'Parth Chauhan'
  course.save();*/
}
// updateAuthor('5e38fae3611d56138443c7d9');
// createCourse('Node Course', new Author({ name: 'Parth',bio: 'My bio',website: 'my website' }));
listCourses();

