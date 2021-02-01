const validate = require("../util/validate");
const { User } = require("../schema/user");
const { http_codes } = require("../constant/http-codes");
const { message } = require("../constant/user_message");
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();

router.post('/', async (req, res) => {
    
    let error={};
    error.email = validate.validateEmail(req.body);
    error.password = validate.validatePassword(req.body);
    if(error.email || error.password){
        return res.status(http_codes.bad_request).json(error);
    }

    if(req.body.email && req.body.password){
        let user = await User.findOne({ email: req.body.email });
        if (!user){
            return res.status(http_codes.bad_request).send(message.new_user);
        }
    
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword){
            return res.status(http_codes.bad_request).send(message.invalid_password);
        }
    
        const token = user.generateAuthToken();

        res.header('auth_token', token).status(http_codes.ok).send(message.valid_user);
    }
    else{
        res.status(http_codes.bad_request).send(message.invalid_login_detail);
    }
});

module.exports = router;
