
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
    .then(()=> console.log('connected to mongoDB'))
    .catch(err => console.error('could not connect to mongodb'));

const detailSchema = new mongoose.Schema({
  name: {
    type:String,
    require:true    //min:6,max:12,enum:[],validate:{ validator:function(value){ custom logic }},
  } ,
  email: {
    type: String,
    unique: true,
    require:true  
  },
  m_numbers: {
    type: [ Number ],
    require:true
  },
  age :{ 
    type:Number,
    require:true 
  },
  date: { 
    type: Date, 
    default: Date.now
  }
});

detailSchema.post('validate',function(next){
  console.log("post");
});
detailSchema.pre('validate',function(next){
  console.log("pre");
  next();
});

const detail = mongoose.model('detail',detailSchema);

async function createDetail(){

  const parth = new detail({
    name: 'Parth',
    email: 'parthchauhan5@gmail.com',
    age: 20,
    m_numbers: [7894561231,3216547891]
  });
  const result = await parth.save();
  console.log(result) 
}
// createDetail();

async function getDetail(){
  // const details = await detail.find({age : { $gt:18, $lt:60 } ,name : /^par/i})
  //                             .sort({email: -1})
  //                             .limit(2)
  //                             .select({email:1});
                              // .countDocuments();
// const details = await detail.findById('5e33fff83bdb33261aa6aa69');
const details = await detail.findOne({_id:'5e33fff83bdb33261aa6aa69'});


  console.log(details)
}
// getDetail();

async function updateDetail(){
  const newDetail = await detail.updateOne({ _id:'5e33fff83bdb33261aa6aa69' },{
    $set: {
      name:'Trusha',
      email:'trusha@gmail.com'
    }
  });
  // const newDetail = await detail.updateMany({},{
  //   $set: {
  //     age: 22
  //   }
  // });
  console.log(newDetail);
}
// updateDetail();

async function deleteDetail(){
  const deletedDetail = await detail.findByIdAndDelete('5e380d8516ec92538ae6eb6a');
  // const deletedDetail = await detail.findByIdAndRemove('5e37c7cd48ed6d39d8be5130');
  console.log(deletedDetail);
}
// deleteDetail();


async function removeDetail(id){
  const result = await detail.deleteMany({ name:'Parth'});
  console.log(result);
}
// removeDetail();

async function detailAggregate(){
  // const docs = await detail.aggregate([{ $match: { 'name': 'Parth' } }]);
  const docs = await detail.aggregate()
  .match( { name: "Parth" })
  .group({ _id: "$name", total: { $sum: "$age" },min_age: {$min:"$age"},max_age:{$max:"$age"} });
  console.log(docs);
}
detailAggregate();


// var mongooseCandy = detail.hydrate({ _id: '5e33fff83bdb33261aa6aa69'}).save();
// console.log(mongooseCandy);