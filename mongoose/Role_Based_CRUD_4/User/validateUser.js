const { http_codes,message,role } = require("./constant");
const jwt = require('jsonwebtoken');

function validateEmail(email){
    if(email != ''){
        const regExpEmail=/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
        if(!regExpEmail.test(email.trim())){
          return message.invalid_email;
        }
    }
    else{
      return message.invalid_email;
    }
}
  
function validateName(name){
    if(name != ''){
        const regExpName = /^[a-zA-Z]{3,32}$/;
        if(!regExpName.test(name.trim())){  
          return message.invalid_name;
        }
    }
    else{
      return message.invalid_name;
    }
}

function validatePassword(password){
    if(password != ''){
        const regExpPassword= /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,30}$/;
        if(!regExpPassword.test(password.trim())){
          return message.strong_password;
        }
    }
    else{
      return message.strong_password;
    }
}

function generateAuthToken(user) { 
  const token = jwt.sign({ _id: user._id, role: user.role, email:user.email}, process.env.jwtPrivateKey,{expiresIn: '24h'});
  return token;
}

async function validateToken(req,res){
  const token = req.header('auth_token');

  let decoded = await jwt.verify(token, process.env.jwtPrivateKey, (err,decoded)=>{
    if(err){
      res.status(http_codes.not_found).send(err);
      return false;
    }
    else{
      return decoded;
    }
  });
  return decoded;
}

function validaterole(req_role,valid_role){
  if(valid_role == role.Male || valid_role == role.Female){
      return false;
  }
  else if(valid_role == role.Queen){
      if(req_role.toUpperCase() == role.Queen || req_role.toUpperCase() == role.King){
          return false;
      }
      else{
          return true;
      }
  }
  else if(valid_role == role.King){
    if(req_role.toUpperCase() == role.King){
        return false;
      }
      else{
          return true;
      }
  }
}

module.exports = {validateEmail,validateName,validatePassword,generateAuthToken,validateToken,validaterole };