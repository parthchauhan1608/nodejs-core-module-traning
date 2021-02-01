const { Token } = require("../schema/token");
const { User } = require("../schema/user");
const validate = require("../util/validate");
const { http_codes } = require("../constant/http_codes");
const { message } = require("../constant/user_message");
const bcrypt = require("bcrypt");

async function checkAlreadyUserRegister(req,res){
    let user = await User.findOne({ email : req.body.email });
    if(user){
        return res.status(http_codes.bad_request).send(message.exsist_user);
    }
}

async function createUser(req,res){
    let user = new User({
        name:req.body.name.trim(),
        email:req.body.email.trim(),
        password:req.body.password.trim(),
        role: req.body.role
    });
    const salt = await bcrypt.genSalt(10);
    user.password =await bcrypt.hash(user.password,salt);   

    user = await user.save();
    res.status(http_codes.ok).send(user);
}

async function checkNewUser(req,res){
    let user = await User.findOne({ email: req.body.email });
    if (!user){
        return res.status(http_codes.bad_request).send(message.new_user);
    }
    return user;
}

async function signIn(req,res){
    user = await User.findOne({ email: req.body.email });
    const token = validate.generateAuthToken(user);
    res.header('auth_token', token).status(http_codes.ok).send(message.valid_user);
}
async function getUSerByRole(req,res){
    let decoded = req.body.decoded;
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
                            .select('-password -_id -__v');
            res.status(http_codes.ok).send(user);
        }
        if(decoded.role == 'Female'){
            user = await User.find({ role: {$in: ['Male','Female']}})
                            .select('-password -_id -__v');
            res.status(http_codes.ok).send(user);
        }
    }
}

function updateUserById(req,res){
    let _id = req.body._id;
    User.findOneAndUpdate({_id:_id },{ $set : req.body })
    .then(()=>{
        res.status(http_codes.ok).send(message.updated);
    })
    .catch((err)=>{
        res.send(err);
    });
}

function updateUserByEmail(req,res){
    email = req.query.email;

    User.findOneAndUpdate({ email:email },{ $set : req.body })
    .then(()=>{
        res.status(http_codes.ok).send(message.updated);
    })
    .catch((err)=>{
        res.send(err);
    });
}

function deleteUserById(req,res){
    let _id = req.body._id;
    User.findByIdAndDelete(_id)
    .then(()=>{
        res.status(http_codes.ok).send(message.removed);
    })
    .catch((err)=>{
        res.send(err);
    });
}

function deleteUserByEmail(req,res){
    email = req.query.email;

    User.findOneAndDelete({ email:email })
    .then(()=>
    {
        res.status(http_codes.ok).send(message.removed);
    })
    .catch((err)=>{
        res.send(err);
    });
}

async function logout(req,res){
    const token_header = req.header('auth_token');
    token = new Token({
        token:token_header
    });
    await token.save();
    res.status(http_codes.ok).send(message.logout);
}

module.exports = { checkAlreadyUserRegister,createUser,checkNewUser,signIn,getUSerByRole,updateUserById,updateUserByEmail,deleteUserById,deleteUserByEmail,logout};