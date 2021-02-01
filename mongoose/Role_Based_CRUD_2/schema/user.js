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
      enum : ['King', 'Queen','Male','Female'], 
      require: true
    }
  });


exports.User = mongoose.model('User', userSchema);
