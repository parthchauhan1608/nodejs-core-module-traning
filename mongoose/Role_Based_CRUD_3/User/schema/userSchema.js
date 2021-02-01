const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum : ['KING', 'QUEEN','MALE','FEMALE'], 
      require: true
    },
    createdAt : {
      type : Date
    },
    createdBy : {
      type : String
    },
    editedAt : {
      type : Date
    },
    editedBy : {
      type : String
    },
    status : {
      type : Boolean,
      default : true
    },
    __v: {
      type: Number,
      select: false
    }
  });


exports.User = mongoose.model('User', userSchema);
