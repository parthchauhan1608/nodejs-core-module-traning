const { http_codes } = require("../constant/http_codes");
const { message } = require("../constant/user_message");


function success(user){
    return  {
        http_code : http_codes.ok,
        message : user
    };
}

function successLogin(){
    return {
        http_code : http_codes.ok,
        message : message.valid_user
    };
}

function successRemoved(){
    return {
        http_code : http_codes.ok,
        message : message.block
    };
}

function successLogout(){
    return {
        http_code : http_codes.ok,
        message : message.logout
    };
}

function noToken(){
    return {
        http_code : http_codes.bad_request,
        message : message.token_not_found
    }
}

module.exports = { success,successLogin,successRemoved,successLogout,noToken };
