const { User } = require("../schema/user");
const validate = require("../util/validate");
const { http_codes } = require("../constant/http-codes");
const { message } = require("../constant/user_message");
const bcrypt = require("bcrypt");
const express = require("express");
const jwt = require('jsonwebtoken');
require("dotenv").config();

const router = express.Router();
router.get('/:id',async (req,res)=>{
    
    const decoded = validate.validateToken(req,res);
    const user = await User.find({_id:decoded._id})
                            .select('name email -_id');
    res.status(http_codes.ok).send(user);
});

router.patch('/',async (req,res)=>{
    
    let error={};
    error.name = validate.validateName(req.body);
    error.email = validate.validateEmail(req.body);
    error.password = validate.validatePassword(req.body);
    
    if(error.name || error.email || error.password){
        return res.status(http_codes.bad_request).json(error);
    }

    const decoded = validate.validateToken(req,res);
    const salt = await bcrypt.genSalt(10);
    const new_password = await bcrypt.hash(req.body.password,salt);

    await User.findByIdAndUpdate({_id:decoded._id},{$set:{
        name:req.body.name.trim(),
        email:req.body.email.trim(),
        password:new_password
    }});
        res.status(http_codes.ok).send(message.updated);
});
router.delete('/:id',async (req,res)=>{
    
    const decoded = validate.validateToken(req,res);
    data = await User.findByIdAndRemove({_id:decoded._id});
    if(!data){
        res.status(http_codes.bad_request).send(message.bad_request);
    }
    res.status(http_codes.ok).send(message.removed);
});

router.patch('/logout',(req,res)=>{

});

module.exports = router;