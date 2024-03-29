const {User, validate} = require('../models/user');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();


router.post('/', async (req, res) => {
    const error = validate(req.body); 
    if (error){
        return res.status(400).json(error);
    }

    let user = await User.findOne({ email: req.body.email });
    if (user){
        return res.status(400).send('User already registered.');
    }
    user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    const salt = await bcrypt.genSalt(10);
    user.password =await bcrypt.hash(user.password,salt);
    user = await user.save();
    res.send(user);
});


module.exports = router;
