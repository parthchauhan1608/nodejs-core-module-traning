const validate = require("../util/validate");
const { http_codes } = require("../constant/http_codes");
const { message } = require("../constant/user_message");
const { User } = require("../schema/user");
const bcrypt = require("bcrypt");


function createUser(req,res,next){
    let error={};
    error.name = validate.validateName(req.body.name);
    error.email = validate.validateEmail(req.body.email);
    error.password = validate.validatePassword(req.body.password);
    if(error.name || error.email || error.password){
        res.status(http_codes.bad_request).json(error);
    }
    else{
        next();
    }
}

async function login(req,res,next){
    let error={};
    error.email = validate.validateEmail(req.body.email);
    error.password = validate.validatePassword(req.body.password);
    if(error.email || error.password){
        res.status(http_codes.bad_request).json(error);
    }
    let user = await User.findOne({ email: req.body.email });
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword){
        res.status(http_codes.bad_request).send(message.invalid_password);
    }
    else{
        next();
    }
}

async function getUserDetailByRole(req,res,next){
    req.body.decoded = await validate.validateToken(req,res);
    next();
}

async function validateUserRole(req,res,next){
    const decoded =await validate.validateToken(req,res);
    if(decoded != false){
        role = validate.validaterole(req.body.role,decoded.role);
        if(!role){
            res.status(http_codes.bad_request).send(message.invalid_role);
        }
        else{
            next();
        }
    }
}

async function updateUserByRole(req,res,next){
    const decoded =await validate.validateToken(req,res);
    if(decoded != false){
        email = req.query.email;
        let user = await User.findOne({ email:email });
        if(user){
            error ={};
            if(req.body.name){
                error.name = validate.validateName(req.body.name);
            }
            if(req.body.email){
                error.email = validate.validateEmail(req.body.email);
            }
            if(req.body.password){
                error.password = validate.validatePassword(req.body.password);
                
                const salt = await bcrypt.genSalt(10);
                req.body.password =await bcrypt.hash(req.body.password,salt);  
            }
            
            if(error.name || error.email || error.password){
                res.status(http_codes.bad_request).json(error);
            }
            else if(decoded._id == user._id){
                req.body._id = decoded._id;
            }
            else{
                if(req.body.role){
                    const role = validate.validaterole(user.role,decoded.role);
                    if(!role){
                        res.status(http_codes.bad_request).send(message.invalid_role);
                    }
                }
            }
        }
        else{
            res.status(http_codes.bad_request).send(message.unexsisted_user);
        }
        next();
    }
}

async function deleteUserByRole(req,res,next){
    const decoded = await validate.validateToken(req,res);
    if(decoded != false){
        email = req.query.email;
        let user = await User.findOne({ email:email });
        if(user){
            if(decoded._id == user._id){
                req.body._id = decoded._id;
            }
            else{
                validateUserRole(req,res,next);
            }
        }
        next();
    }
}

module.exports = {createUser,login,getUserDetailByRole,validateUserRole,updateUserByRole,deleteUserByRole };
