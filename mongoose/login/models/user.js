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
  },
  token:{
    type: String
  }
});

userSchema.methods.generateAuthToken = function() { 
  const token = jwt.sign({ _id: this._id}, process.env.jwtPrivateKey,{expiresIn: '24h'});
  return token;
}


const User = mongoose.model('User', userSchema);

function validateUser(user) {
  let regExpName = /^[a-zA-Z]{3,32}$/,
      regExpEmail=/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
      regExpPassword= /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,30}$/;
  
  let error = false;
  let errMassage = {
    err : 400
  }
  if(!regExpName.test(user.name)){
    errMassage.errName = "Invalid Name";
    error = true;
  }
  if(!regExpEmail.test(user.email)){
    errMassage.errEmail = "Invalid Email";
    error = true;
  }
  if(!regExpPassword.test(user.password)){
    errMassage.errName = "Enter strong-Password";
    error = true;
  }

  if(error){
    return errMassage;
  }
}

exports.User = User; 
exports.validate = validateUser;