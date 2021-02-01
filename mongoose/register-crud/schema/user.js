const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
mongoose.set('useFindAndModify', false);
require("dotenv").config();


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
  }
});

userSchema.methods.generateAuthToken = function() { 
  const token = jwt.sign({ _id: this._id}, process.env.jwtPrivateKey,{expiresIn: '2h'});
  return token;
}

exports.User = mongoose.model('User', userSchema);