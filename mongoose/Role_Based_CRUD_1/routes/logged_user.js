const validate = require("../util/validate");
const { User } = require("../schema/user");
const { Token } = require("../schema/token");
const { http_codes } =require("../constant/http_codes");
const { message } = require("../constant/user_message");
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();

router.get('/',async (req,res)=>{
    // const decoded = await validate.validateToken(req,res);
    if(decoded != undefined){
        if(decoded.role == 'King'){
            user = await User.find()
                            .select('-_id -__v');
            res.status(http_codes.ok).send(user);
        }
        if(decoded.role == 'Queen'){
            user = await User.find({ role: {$in: ['Male','Female','Queen']}})
                            .select('-_id -__v');
            res.status(http_codes.ok).send(user);
        }
        if(decoded.role == 'Male'){
            user = await User.find({ role: {$in: ['Male','Female']}})
                            .select('name email -_id -__v');
            res.status(http_codes.ok).send(user);
        }
        if(decoded.role == 'Female'){
            user = await User.find({ role: {$in: ['Male','Female']}})
                            .select('name email -_id -__v');
            res.status(http_codes.ok).send(user);
        }
    }
});

router.post('/',async (req,res)=>{
    // const decoded =await validate.validateToken(req,res);
    // if(decoded != undefined){
    //     role = validate.validaterole(req.body.role,decoded.role);
    //     if(!role){
    //         res.status(http_codes.bad_request).send(message.invalid_role);
    //     }
    
    //     let error={};
    //     error.name = validate.validateName(req.body.name);
    //     error.email = validate.validateEmail(req.body.email);
    //     error.password = validate.validatePassword(req.body.password);
    //     if(error.name || error.email || error.password){
    //         return res.status(http_codes.bad_request).json(error);
    //     }
        
        // user = new User({
        //     name:req.body.name.trim(),
        //     email:req.body.email.trim(),
        //     password:req.body.password.trim(),
        //     role: req.body.role
        // });
        // const salt = await bcrypt.genSalt(10);
        // user.password =await bcrypt.hash(user.password,salt);   
    
        // user = await user.save();
        // res.status(http_codes.ok).send(user);
    // }
});

router.patch('/',async (req,res)=>{
    const decoded =await validate.validateToken(req,res);
    if(decoded != undefined){
        email = req.query.email;
        let user = await User.findOne({ email:email });
        if(user){
            let error={};
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
                return res.status(http_codes.bad_request).json(error);
            }
            if(decoded._id == user._id){
                User.findOneAndUpdate({_id:decoded._id },{ $set : req.body })
                    .then(()=>{
                        res.status(http_codes.ok).send(message.updated);
                    })
                    .catch((err)=>{
                        res.send(err);
                    });
            }
            else{
                role = validate.validaterole(user.role,decoded.role);
                if(!role){
                    res.status(http_codes.bad_request).send(message.invalid_role);
                }
                else{
                    if(req.body.role){
                        role = validate.validaterole(user.role,decoded.role);
                        if(!role){
                            res.status(http_codes.bad_request).send(message.invalid_role);
                        }
                        else{
                            User.findOneAndUpdate({ email:email },{ $set : req.body })
                            .then(()=>{
                                res.status(http_codes.ok).send(message.updated);
                            })
                            .catch((err)=>{
                                res.send(err);
                            });
                        }
                    }
                    else{
                        User.findOneAndUpdate({ email:email },{ $set : req.body })
                        .then(()=>{
                            res.status(http_codes.ok).send(message.updated);
                        })
                        .catch((err)=>{
                            res.send(err);
                        });
                    }
                }
            }
        }
        else{
            res.status(http_codes.bad_request).send(message.unexsisted_user);
        }
    }
});

router.delete('/',async (req,res)=>{
    const decoded = await validate.validateToken(req,res);
    if(decoded != undefined){
        email = req.query.email;
        let user = await User.findOne({ email:email });
        if(user){
            if(decoded._id == user._id){
                User.findByIdAndDelete(decoded._id)
                    .then(()=>{
                        res.status(http_codes.ok).send(message.removed);
                    })
                    .catch((err)=>{
                        res.send(err);
                    });
            }
            else{
                role = validate.validaterole(user.role,decoded.role);
                if(!role){
                    res.status(http_codes.bad_request).send(message.invalid_role);
                }
                else{
                    User.findOneAndDelete({ email:email })
                        .then(()=>
                        {
                            res.status(http_codes.ok).send(message.removed);
                        })
                        .catch((err)=>{
                            res.send(err);
                        });
                }
            }
        }
        else{
            res.status(http_codes.bad_request).send(message.unexsisted_user);
        }
    }
});

router.post('/logout',async(req,res)=>{
    const token_header = req.header('auth_token');
    token = new Token({
        token:token_header
    });
    await token.save();
    res.status(http_codes.ok).send(message.logout);
});

module.exports = router;