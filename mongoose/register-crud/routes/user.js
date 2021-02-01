const validate = require("../util/validate");
const { User } = require("../schema/user");
const { http_codes } = require("../constant/http-codes");
const { message } = require("../constant/user_message");
const bcrypt = require("bcrypt");
const express = require("express");

const router = express.Router();

router.get('/',async (req,res)=>{
    const user = await User.find()
                            .select('name email -_id');
    res.status(http_codes.ok).send(user);
});

router.get('/:id',async (req,res)=>{
    const id = req.params.id;
    const user = await User.find({ _id:id })
                            .select('name email -_id');
    res.status(http_codes.ok).send(user);
});

router.post('/',async (req,res)=>{
    let error={};
    error.name = validate.validateName(req.body);
    error.email = validate.validateEmail(req.body);
    error.password = validate.validatePassword(req.body);
    if(error.name || error.email || error.password){
        return res.status(http_codes.bad_request).json(error);
    }
    
    let user = await User.findOne({ email : req.body.email });
    if(user){
        return res.status(http_codes.bad_request).send(message.exsist_user);
    }
    user = new User({
        name:req.body.name.trim(),
        email:req.body.email.trim(),
        password:req.body.password.trim()
    });
    const salt = await bcrypt.genSalt(10);
    user.password =await bcrypt.hash(user.password,salt);

    user = await user.save();
    res.status(http_codes.ok).send(user);
});

router.put('/:id',async (req,res)=>{
    const id = req.params.id;
    let error={};
    error.name = validate.validateName(req.body);
    error.email = validate.validateEmail(req.body);
    error.password = validate.validatePassword(req.body);
    if(error.name || error.email || error.password){
        return res.status(http_codes.bad_request).json(error);
    }
    const salt = await bcrypt.genSalt(10);
    req.body.password =await bcrypt.hash(req.body.password.trim(),salt);

    await User.findByIdAndUpdate({_id:id},{$set:{
        name:req.body.name.trim(),
        email:req.body.email.trim(),
        password: req.body.password
    }});
    res.status(http_codes.ok).send(message.updated);
});
router.delete('/:id',async (req,res)=>{
    const id = req.params.id;
    
    await User.findByIdAndRemove({_id:id});
    res.status(http_codes.ok).send(message.removed);
});


module.exports = router;