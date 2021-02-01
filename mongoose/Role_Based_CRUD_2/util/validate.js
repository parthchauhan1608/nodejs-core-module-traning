const { message } = require("../constant/user_message");
const { http_codes } = require("../constant/http_codes");
const { Token } = require("../schema/token");
const jwt = require('jsonwebtoken');


function validateEmail(email){
  let regExpEmail=/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
  let error = false;
  let errMassage = {};
  
  if(!regExpEmail.test(email.trim())){
    errMassage.errEmail = message.invalid_email;
    error = true;
  }
  if(error){
    return errMassage;
  }
}

function validateName(name){
  let regExpName = /^[a-zA-Z]{3,32}$/;
  let error = false;
  let errMassage = {};
  
  if(!regExpName.test(name.trim())){  
    errMassage.errName = message.invalid_name;
    error = true;
  }

  if(error){
    return errMassage;
  }
}

function validatePassword(password){
  let regExpPassword= /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,30}$/;
  let error = false;
  let errMassage = {};
  
  if(!regExpPassword.test(password.trim())){
    errMassage.errPassword = message.strong_password;
    error = true;
  }
  if(error){
    return errMassage;
  }
}

function validaterole(req_role,valid_role){
    if(valid_role == 'Male' || valid_role == 'Female'){
        return false;
    }
    else if(valid_role == 'Queen'){
        if(req_role == 'Queen' || req_role == 'King'){
            return false;
        }
        else{
            return true;
        }
    }
    else if(valid_role == 'King'){
        if(req_role == 'King'){
            return false;
        }
        else{
            return true;
        }
    }
}

function generateAuthToken(user) { 
    const token = jwt.sign({ _id: user._id, role: user.role}, process.env.jwtPrivateKey,{expiresIn: '24h'});
    return token;
}

async function validateToken(req,res){
  const token = req.header('auth_token');

  if(token){
    const has_token =await Token.find({token:token});
    if(has_token[0]){
      res.status(http_codes.unauthorized).send(message.unauthorized);
      return false;
    }
    else{
      const decoded = jwt.verify(token, process.env.jwtPrivateKey);
      return decoded;
    }
  }
  else{
    res.status(http_codes.unauthorized).send(message.unauthorized);
    return false;
  }
}

module.exports = {validateEmail,validateName,validatePassword,validateToken,generateAuthToken,validaterole};