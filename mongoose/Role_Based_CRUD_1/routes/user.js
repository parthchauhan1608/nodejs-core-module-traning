const validate = require("../util/validate");
const { User } = require("../schema/user");
 const { http_codes } = require("../constant/http_codes");
const { message } = require("../constant/user_message");
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();

router.post('/',async (req,res)=>{
    // let error={};
    // error.name = validate.validateName(req.body.name);
    // error.email = validate.validateEmail(req.body.email);
    // error.password = validate.validatePassword(req.body.password);
    // if(error.name || error.email || error.password){
    //     return res.status(http_codes.bad_request).json(error);
    // }
    
    // let user = await User.findOne({ email : req.body.email });
    // if(user){
    //     return res.status(http_codes.bad_request).send(message.exsist_user);
    // }
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
});

router.post('/login', async (req, res) => {
    
    // let error={};
    // error.email = validate.validateEmail(req.body.email);
    // error.password = validate.validatePassword(req.body.password);
    // if(error.email || error.password){
    //     return res.status(http_codes.bad_request).json(error);
    // }

    // let user = await User.findOne({ email: req.body.email });
    // if (!user){
    //     return res.status(http_codes.bad_request).send(message.new_user);
    // }

    // const validPassword = await bcrypt.compare(req.body.password, user.password);
    // if (!validPassword){
    //     return res.status(http_codes.bad_request).send(message.invalid_password);
    // }

    // const token = validate.generateAuthToken(user);
    // res.header('auth_token', token).status(http_codes.ok).send(message.valid_user);
});


module.exports = router;