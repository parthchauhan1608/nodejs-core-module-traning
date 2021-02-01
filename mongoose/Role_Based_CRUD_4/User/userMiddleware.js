const { http_codes,message } = require("./constant");
const validate = require("./validateUser");
const bcrypt = require("bcrypt");

async function createUser(req, res, next) {
    if(req.body.name && req.body.email && req.body.password && req.body.role && req.body.role != ''){
        let error = {};
        error.errorName = validate.validateName(req.body.name);
        error.errorEmail = validate.validateEmail(req.body.email);
        error.errorPassword = validate.validatePassword(req.body.password);
        if (error.errorName || error.errorEmail || error.errorPassword) {
            res.status(http_codes.bad_request).send(error);
        }
        else {
            if(req.body.createdBy_email){
                next();
            }
            else{
                req.body.createdBy_email = req.body.email;
                next();
            }
        }
    }
    else{
        res.status(http_codes.bad_request).send(message.invalid_request_body);
    }
}

async function login(req, res, next) {
    if(req.body.email && req.body.password){
        let error = {};
        error.errorEmail = validate.validateEmail(req.body.email);
        error.errorPassword = validate.validatePassword(req.body.password);
        if (error.errorEmail || error.errorPassword) {
            res.status(http_codes.bad_request).send(error);
        }
        else{
            next();
        }
    }
    else{
        res.status(http_codes.bad_request).send(message.invalid_request_body);
    }
}

async function getUserDetailByRole(req, res, next) {
    req.body.decoded = await validate.validateToken(req, res);
    if(req.body.decoded){
        next();
    }
}

async function validateUserRole(req, res, next) {
    const decoded = await validate.validateToken(req, res);
    req.body.token = decoded;
    if (decoded) {
        if(req.body.role){
            role = await validate.validaterole(req.body.role, decoded.role);
            if (!role) {
                res.status(http_codes.bad_request).send(message.invalid_role);
            }
            else {
                req.body.createdBy_email = decoded.email;
                next();
            }
        }
        else{
            next();
        }
    }
}

async function updateUserByRole(req, res, next) {
    const decoded = req.body.token;
    error = {};
    if (req.body.name) {
        error.errorName = validate.validateName(req.body.name);
    }
    if (req.body.email) {
        error.errorEmail = validate.validateEmail(req.body.email);
    }
    if (req.body.password) {
        error.errorPassword = validate.validatePassword(req.body.password);
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    if (error.errorName || error.errorEmail || error.errorPassword) {
        res.status(http_codes.bad_request).send(error);
        flag = false;
    }
    else{
        req.body.token = decoded;
        next();
    }
}

async function validateToken(req,res,next){
    const decoded = await validate.validateToken(req, res);
    if(decoded){
        next();
    }
    else{
        res.status(http_codes.bad_request).send(message.unexsisted_user);
    }
}

module.exports = { createUser,login,getUserDetailByRole,validateUserRole,updateUserByRole,validateToken };
