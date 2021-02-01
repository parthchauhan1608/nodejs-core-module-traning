const jwt = require('jsonwebtoken');
const {User} = require('../models/user');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();


router.post('/', async (req, res) => {
    const error = validate(req.body); 
    if (error){
        return res.status(400).json(error);
    }

    let user = await User.findOne({ email: req.body.email });
    if (!user){
        return res.status(400).send('New User first need to register.');
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword){
        return res.status(400).send('Invalid password.');
    }

    const token = user.generateAuthToken();
    user.token = token;
    user.save()
        .catch((err)=>{console.log(err);});
    res.status(200).send('Validate user');
});

function validate(user) {
    let regExpEmail=/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
        regExpPassword= /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,30}$/;
    
    let error = false;
    let errMassage = {
      err : 400
    }
    if(!regExpEmail.test(user.email)){
      errMassage.errEmail = "Invalid Email";
      error = true;
    }
    if(!regExpPassword.test(user.password)){
      errMassage.errName = "Enter strong-Password";
      error = true;
    }
  
    if(error){
      return errMassage;
    }
  }
module.exports = router; 
