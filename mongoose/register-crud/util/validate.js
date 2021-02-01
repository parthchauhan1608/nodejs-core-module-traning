const { message } = require("../constant/user_message");
const { http_codes } = require("../constant/http-codes");
const jwt = require('jsonwebtoken');


function validateEmail(user){
  let regExpEmail=/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
  let error = false;
  let errMassage = {};
  
  if(!regExpEmail.test(user.email.trim())){
    errMassage.errEmail = message.invalid_email;
    error = true;
  }
  if(error){
    return errMassage;
  }
}

function validateName(user){
  let regExpName = /^[a-zA-Z]{3,32}$/;
  let error = false;
  let errMassage = {};
  
  if(!regExpName.test(user.name.trim())){  
    errMassage.errName = message.invalid_name;
    error = true;
  }

  if(error){
    return errMassage;
  }
}

function validatePassword(user){
  let regExpPassword= /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,30}$/;
  let error = false;
  let errMassage = {};
  
  if(!regExpPassword.test(user.password.trim())){
    errMassage.errPassword = message.strong_password;
    error = true;
  }
  if(error){
    return errMassage;
  }
}

function validateToken(req,res){
  const token = req.header('auth_token');

  if(token){
    const decoded = jwt.verify(token, process.env.jwtPrivateKey);
    return decoded;
  }
  else{
    res.status(http_codes.unauthorized).send()
  }
}

module.exports = {validateEmail,validateName,validatePassword,validateToken};