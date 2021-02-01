const jwt = require('jsonwebtoken');
require("dotenv").config();
const {User} = require('../models/user');


module.exports =async function (req, res, next) {
    let user = await User.findOne({ email: req.body.email });
    if (!user.token){
        return res.status(401).send('Access denied. No token provided.');
    }
    if(jwt.verify(user.token, process.env.jwtPrivateKey)){
        next();
    }
    else{
        res.status(400).send('Invalid token.');
    }
}