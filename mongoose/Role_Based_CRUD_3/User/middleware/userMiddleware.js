const validate = require("../util/validate");
const { http_codes } = require("../constant/http_codes");
const { message } = require("../constant/user_message");
// const { User } = require("../schema/userSchema");
const service = require("../service/userService");
const bcrypt = require("bcrypt");


async function createUser(req, res, next) {
    // let error = {};
    // error.errorName = validate.validateName(req.body.name);
    // error.errorEmail = validate.validateEmail(req.body.email);
    // error.errorPassword = validate.validatePassword(req.body.password);
    // if (error.errorName || error.errorEmail || error.errorPassword) {
    //     res.status(http_codes.bad_request).send(error);
    // }
    // else {
        // let user = await User.findOne({ email : req.body.email });
        let user = await service.findOneByEmail(req.body.email);
        if(user){
            res.status(http_codes.bad_request).send(message.exsist_user);
        }
        else{
            if(req.body.createdBy_email){
                next();
            }
            else{
                req.body.createdBy_email = req.body.email;
                next()
            }
        }
    // }
}

async function login(req, res, next) {
    // let error = {};
    // error.errorEmail = validate.validateEmail(req.body.email);
    // error.errorPassword = validate.validatePassword(req.body.password);
    // if (error.errorEmail || error.errorPassword) {
    //     res.status(http_codes.bad_request).send(error);
    // }

    // let user = await User.findOne({ email: req.body.email });
    let user = await service.findOneByEmail(req.body.email);
    if(user){
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            res.status(http_codes.bad_request).send(message.invalid_password);
        }
        else {
            next();
        }
    }
    else{
        res.status(http_codes.bad_request).send(message.new_user);
    }
}

// async function getUserDetailByRole(req, res, next) {
//     req.body.decoded = await validate.validateToken(req, res);
//     if(req.body.decoded){
//         next();
//     }
// }

async function validateUserRole(req, res, next) {
    const decoded = await validate.validateToken(req, res);
    if (decoded) {
        role = await validate.validaterole(req.body.role, decoded.role);
        if (!role) {
            res.status(http_codes.bad_request).send(message.invalid_role);
        }
        else {
            req.body.createdBy_email = decoded.email;
            next();
        }
    }
}

async function updateUserByRole(req, res, next) {
    // const decoded = await validate.validateToken(req, res);
    // let flag = true;
    // if (decoded) {
    //     req.body.editedBy = decoded.email;
    //     email = req.query.email;
    //     // let user = await User.findOne({ email: email });
    //     let user = await service.findOneByEmail(email);
    //     if (user) {
    //         error = {};
    //         if (req.body.name) {
    //             error.errorName = validate.validateName(req.body.name);
    //         }
    //         if (req.body.email) {
    //             error.errorEmail = validate.validateEmail(req.body.email);
    //         }
    //         if (req.body.password) {
    //             error.errorPassword = validate.validatePassword(req.body.password);

    //             const salt = await bcrypt.genSalt(10);
    //             req.body.password = await bcrypt.hash(req.body.password, salt);
    //         }

    //         if (error.errorName || error.errorEmail || error.errorPassword) {
    //             res.status(http_codes.bad_request).send(error);
    //             flag = false;
    //         }
            else if (decoded._id == user._id) {
                req.body._id = decoded._id;
            }
            else {
                    const role = validate.validaterole(user.role, decoded.role);
                    if (!role) {
                        res.status(http_codes.bad_request).send(message.invalid_role);
                        flag = false;
                    }
            }
        }
        else {
            res.status(http_codes.bad_request).send(message.unexsisted_user);
            flag = false;
        }

        if(flag){
            next();
        }
    }
}

async function blockUserByRole(req, res, next) {
    const decoded = await validate.validateToken(req, res);
    if (decoded) {
        req.body.editedBy = decoded.email;
        email = req.params.email;
        // let user = await User.findOne({ email: email });
        let user = await service.findOneByEmail(email);
        if (user) {
            if (decoded._id == user._id) {
                req.body._id = decoded._id;
                next();
            } 
            else {
                let role = await validate.validaterole(user.role, decoded.role);
                if (!role) {
                    res.status(http_codes.bad_request).send(message.invalid_role);
                }
                else {
                    next();
                }
            }
        }
        else {
            res.status(http_codes.bad_request).send(message.unexsisted_user);
        }
    }
}

module.exports = { createUser, login, getUserDetailByRole, validateUserRole, updateUserByRole, blockUserByRole };
