const dao = require("./userDao");
const response = require("./userResponseHandler");
const validate = require("./validateUser");
const { role } = require("./constant");
const bcrypt = require("bcrypt");
const { User,Token } = require("./userSchema");
const { message } = require("./constant");
const nodemailer = require("nodemailer");
 

async function createUser(req){
    // check Token Already Expire or Not
    let error_Token =await tokenVerify(req);
    if(error_Token){
        return error_Token;
    } 

    // check user Already Register or Not
    return await dao.findOne({ email : req.body.email })
                    .then(async(user)=>{
                        if(user){
                            return response.userAlreadyExsist();
                        }
                        else{
                            // create new user
                            let newUser
                            if(req.body.decodedToken){
                                newUser = new User({
                                    name:req.body.name,
                                    email:req.body.email,
                                    password:req.body.password,
                                    role: req.body.role.toUpperCase(),
                                    createdAt : Date.now(),
                                    createdBy : req.body.decodedToken._id
                                });
                            }
                            else{
                                newUser = new User({
                                    name:req.body.name,
                                    email:req.body.email,
                                    password:req.body.password,
                                    role: req.body.role.toUpperCase(),
                                    createdAt : Date.now()
                                });
                            }
                            const salt = await bcrypt.genSalt(10);
                            newUser.password =await bcrypt.hash(newUser.password,salt);  
                    
                            // Here save query
                            let result = await dao.saveNewUser(newUser)
                                        .then((user)=>{
                                            return response.success(message.userCreated,user);
                                        })
                                        .catch(()=>{
                                            return response.internalServerError();
                                        });
                            return result;
                        }
                    })
                    .catch(()=>{
                        return response.internalServerError();
                    });
}

async function signIn(req){
    // check user Already Register or Not
    return await dao.findOne({ email : req.body.email })
                .then(async(user)=>{
                    if(!user){
                        return response.userNotExist();
                    }
                    else{
                        const validPassword = await bcrypt.compare(req.body.password, user.password);
                        if (!validPassword) {
                            return response.invalidPassword();
                        }
                        else{
                            // GenerateToken 
                            const token =await validate.generateAuthToken(user);
                            if(token){
                                let res = response.success(message.loggedIn,user);
                                res.token = token;
                                return res;
                            }
                            else{
                                return response.internalServerError();
                            }
                        }
                    }
                })
                .catch(()=>{
                    return response.internalServerError();
                });
}

async function getUSerByRole(req){
    // check Token Already Expire or Not
    let error_Token =await tokenVerify(req);
    if(error_Token){
        return error_Token;
    } 
    else{
        // get Users Detail by role
        let token = req.body.decodedToken;
        let user = await dao.findOne({ _id : token._id })
                            .then((user)=>{
                                if(user){
                                    return user;
                                }
                                else{
                                    return response.dataNotFound();
                                }
                            })
                            .catch(()=>{
                                return response.internalServerError();
                            });
        if(user.code){
            return user;
        }
        let query;
        if(user.role == role.King){
            query = { _id : { $nin : [ token._id ] }, role: {$in: [role.King,role.Queen,role.Male,role.Female]}};
        }
        else if(user.role == role.Queen){
            query = { _id : { $nin : [ token._id ] }, role: {$in: [role.Queen,role.Male,role.Female]}};
        }
        else if(user.role == role.Male){
            query = { _id : { $nin : [ token._id ] }, role: {$in: [role.Male]}};
        }
        else if(user.role == role.Female){
            query = { _id : { $nin : [ token._id ] }, role: {$in: [role.Female]}};
        }
        else{
            return response.internalServerError();
        }
        // Here find query
        return await dao.find(query,'-password')
                    .then((users)=>{
                        if(users[0]){
                            return response.success(message.userDetails,users);
                        }
                        else{
                            return response.dataNotFound();
                        }
                    })
                    .catch(()=>{
                        return response.internalServerError();
                    });
    }
}

async function getUSerById(req){
    // check Token Already Expire or Not
    let error_Token =await tokenVerify(req);
    if(error_Token){
        return error_Token;
    } 
    else{
        // Here find query
        return await dao.findOne({ _id : req.params.id })
                    .then((users)=>{
                        if(users){
                            return response.success(message.userDetails,users);
                        }
                        else{
                            return response.dataNotFound();
                        }
                    })
                    .catch(()=>{
                        return response.internalServerError();
                    });
    }
}

async function updateUser(req){
    // check Token Already Expire or Not
    let error_Token =await tokenVerify(req);
    if(error_Token){
        return error_Token;
    } 
    else{
        // check user Exist or Not
        return await dao.findOne({ _id : req.params.id })
                    .then(async(user)=>{
                        if(!user){
                            return response.userNotExist();
                        }
                        else{
                            let token = req.body.decodedToken;
                            let findQuery,updateQuery;
                            if(token._id == user._id){
                                req.body.editedAt = Date.now();
                                req.body.editedBy = token._id;
                                findQuery = { _id : req.params.id }
                                if(req.body.role){
                                    if(req.body.role != user.role){
                                        if(!validate.validaterole(req.body.role,user.role)){
                                            return response.invalidUserRole();
                                        }
                                    }
                                    req.body.role = req.body.role.toUpperCase();
                                }
                                updateQuery = { $set : req.body };
                            }
                            else{
                                // validate role and set update query
                                let valid_Role = await validate.validaterole(req.body.role,token.role);
                                if(!valid_Role){
                                    return response.invalidUserRole();
                                }
                                else{
                                    req.body.editedAt = Date.now();
                                    req.body.editedBy = token._id;
                                    findQuery = { _id : req.params.id };
                                    updateQuery = { $set : req.body };
                                }
                            }
                            // Here update query
                            let result = await dao.update(findQuery,updateQuery,'-password')
                                        .then((user)=>{
                                            return response.success(message.updated,user);
                                        })
                                        .catch(()=>{
                                            return response.internalServerError();
                                        });
                            return result;
                        }
                    })
                    .catch(()=>{
                        return response.internalServerError();
                    });
    }
}

async function blockUser(req){
    //check Token Already Expire or Not
    let error_Token =await tokenVerify(req);
    if(error_Token){
        return error_Token;
    } 
    else{
        // check user Exist or Not
        return await dao.findOne({ _id : req.params.id })
                    .then(async (user)=>{
                        if(!user){
                            return response.userNotExist();
                        }
                        else{
                            // Toggle Status
                            let status;
                            if(user.status){
                                status = false;
                            }
                            else{
                                status = true;
                            }
                            let token = req.body.decodedToken;
                            let findQuery,updateQuery;
                            if(token._id == user._id){
                                findQuery = { _id : req.params.id };
                                updateQuery = { $set : { status : status, editedBy : token._id, editedAt : Date.now() } };
                            }
                            else{
                                // validate role and set query
                                let valid_Role = await validate.validaterole(user.role,token.role);
                                if(!valid_Role){
                                   return response.invalidUserRole();
                                }
                                else{
                                    findQuery = { _id : req.params.id };
                                    updateQuery = { $set : { status : status, editedBy : token._id, editedAt : Date.now() } };
                                }
                            }
                            // Here block query
                            let result = await dao.update(findQuery,updateQuery,'-password')
                                        .then((user)=>{
                                            return response.success(message.statusChanged,user);
                                        })
                                        .catch(()=>{
                                            return response.internalServerError();
                                        });
                            return result;
                        }
                    })
                    .catch(()=>{
                        return response.internalServerError();
                    });
    }
}

async function logout(req){
    //check Token Already Expire or Not
    let error_Token =await tokenVerify(req);
    if(error_Token){
        return error_Token;
    }
    else{
        // save token in expire token collection
        token = new Token({
            token: req.header('auth_token')
        });
        return await dao.saveToken(token)
                    .then((token)=>{
                        return response.logout(token);
                    })
                    .catch(()=>{
                        return response.internalServerError();
                    });
    }
}

async function tokenVerify(req){
    if(req.header('auth_token')){
        return await dao.findToken({ token : req.header('auth_token') })
                    .then((token)=>{
                        if(token){
                            return response.expireToken();
                        }
                        else{
                            return false;
                        }
                    })
                    .catch(()=>{
                        return response.internalServerError();
                    });
    }
}

async function forgotPassword(req){
    return await dao.findOne({ email : req.params.id })
                    .then(async(user)=>{
                        if(!user){
                            return response.userNotExist();
                        }
                        var transporter = nodemailer.createTransport({
                            service: 'gmail',
                            auth: {
                            user: 'khatrichauhan1608@gmail.com',
                            pass: 'Khatri1234@'
                            },
                            tls: {
                                rejectUnauthorized: false
                            }
                        });

                        var mailOptions = {
                            from: 'khatrichauhan1608@gmail.com',
                            to: user.email,
                            subject: `ForgotPassword`,
                            html:`<h3>Link for Change Password</h3>
                                    <a href="http://localhost:4200/changePassword/${user._id}">Forgot Password</a>`
                        };

                        return await transporter.sendMail(mailOptions)
                        .then(()=>{
                            return response.success(message.emailSend);
                        })
                        .catch(()=>{
                            return response.error(error);
                        });

                    })
                    .catch(()=>{
                        return response.internalServerError();
                    });
}

async function changePassword(req){
    const salt = await bcrypt.genSalt(10);
    req.body.password =await bcrypt.hash(req.body.password,salt);  
    return await dao.update({ _id : req.params.id },{ password : req.body.password })
                    .then(()=>{
                        return response.success(message.changedPassword);
                    })
                    .catch(()=>{
                        return response.internalServerError();
                    });
}

module.exports = { createUser,signIn,getUSerByRole,getUSerById,updateUser,blockUser,logout,forgotPassword,changePassword };