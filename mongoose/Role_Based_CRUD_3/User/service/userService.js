const { Token } = require("../schema/tokenSchema");
const { User } = require("../schema/userSchema");
const validate = require("../util/validate");
const { role } = require("../constant/role");
const response = require("../responseHandler/responseHandler");
const bcrypt = require("bcrypt");

var res,user;

async function createUser(req){
    user = new User({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        role: req.body.role.toUpperCase(),
        createdAt : Date.now(),
        createdBy : req.body.createdBy_email
    });
    const salt = await bcrypt.genSalt(10);
    user.password =await bcrypt.hash(user.password,salt);   

    user = await user.save();
    res = response.success(user);
    return res;
}

async function signIn(req){
    // let user = await User.findOne({ email : req.body.email });
    user =await findOneByEmail(req.body.email);
    const token = validate.generateAuthToken(user);
    res = response.successLogin();
    res.token = token;
    return res;
}
async function getUSerByRole(req){
    let decoded = req.body.decoded;
        if(decoded.role == role.King){
            user = await User.find({ role: {$in: role.King_access}})
                            .select('-_id');
            res = response.success(user);
            return res;
        }
        if(decoded.role == role.Queen){
            user = await User.find({ role: {$in: role.Queen_access}})
                            .select('-_id');
            res = response.success(user);
            return res;
        }
        if(decoded.role == role.Male){
            user = await User.find({ role: {$in: role.Male_access}})
                            .select('-password -_id');
            res = response.success(user);
            return res;
        }
        if(decoded.role == role.Female){
            user = await User.find({ role: {$in: role.Female_access}})
                            .select('-password -_id');
            res = response.success(user);
            return res;
        }
}

async function updateUserById(req){
    let _id = req.body._id;
    req.body.editedAt = Date.now();
    await User.updateOne({_id:_id },{ $set : req.body });
    // user = await User.find({ email:email });
    res = response.success(user);
    return res;
}

async function updateUserByEmail(req){
    email = req.query.email;
    req.body.editedAt = Date.now();
    await User.updateOne({ email:email },{ $set : req.body });
    // user = await User.find({ email:email });
    user =await findOneByEmail(email);

    res = response.success(user);
    return res;
}

async function blockUserById(req){
    let _id = req.body._id;
    let editedBy = req.body.editedBy;
    await User.updateOne({_id:_id },{ $set : { status : false, editedBy:editedBy } });
    res = response.successRemoved();
    return res;
}

async function blockUserByEmail(req){
    email = req.params.email;
    let editedBy = req.body.editedBy;
    await User.updateOne({ email : email },{ $set : { status : false, editedBy : editedBy } });
    res = response.successRemoved();
    return res;
}

async function logout(req){
    const token_header = req.header('auth_token');
    if(token_header){
        token = new Token({
            token:token_header
        });
        await token.save();
        res = response.successLogout();
        return res;
    }
    else
    {
        res = response.noToken();
        return res;
    }
}

async function findOneByEmail(email){
    return await User.findOne({ email : email });
}

module.exports = { createUser,signIn,getUSerByRole,updateUserById,updateUserByEmail,blockUserById,blockUserByEmail,logout,findOneByEmail};