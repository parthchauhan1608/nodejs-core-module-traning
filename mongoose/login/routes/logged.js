const {User, validate} = require('../models/user');
const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();


router.put('/',auth, async (req, res) => {
    const error = validate(req.body); 
    if (error){
        return res.status(400).json(error);
    }

    User.findOneAndUpdate({ email: req.body.email },{$set:req.body},
    (err,user)=>{
        if(err){
            res.send(err);
        }
        res.send(user);
    })
    .then(()=>{console.log("updated")})
    .catch((err)=>{console.log(err)});

});


module.exports = router; 
