const { http_codes,message } = require("./constant");

function success(user){
    return  {
        http_code : http_codes.ok,
        message : user
    };
}

function alreadyRegisteredUser(){
    return {
        http_code : http_codes.forbidden,
        message : message.exsist_user
    }
}

function newUserRegisterFirst(){
    return {
        http_code : http_codes.bad_request,
        message : message.new_user
    }
}

function successLogin(){
    return {
        http_code : http_codes.ok,
        message : message.valid_user
    };
}

function internalError(){
    return{
        http_code : http_codes.internalServerError,
        message : message.internalServerError
    }
}

function mongoConnectionError(){
    return{
        http_code : http_codes.internalServerError,
        message : message.mongoNotConnect
    }
}

function dataNotFound(){
    return{
        http_code : http_codes.bad_request,
        message : message.dataNotFound
    }
}

function queryNotPerform(){
    return{
        http_code : http_codes.internalServerError,
        message : message.queryNotPerform
    }
}

function mongoQueryError(){
    return{
        http_code : http_codes.internalServerError,
        message : message.mongoQueryError
    }
}

function expireToken(){
    return{
        http_code : http_codes.bad_request,
        message : message.expited_token
    }
}

function invalidUserRole(){
    return{
        http_code : http_codes.bad_request,
        message : message.invalid_role
    }
}

function invalidPassword(){
    return{
        http_code : http_codes.bad_request,
        message : message.invalid_password
    }
}
module.exports = { success,alreadyRegisteredUser,newUserRegisterFirst,successLogin,internalError,mongoConnectionError,dataNotFound,queryNotPerform,
                mongoQueryError,expireToken,invalidUserRole,invalidPassword };