require("dotenv").config();
const bcrypt = require("bcrypt");
const { User,Token } = require("./userSchema");
const mongoose = require('mongoose');

async function connectToMongoDB(){
    return await mongoose.connect(process.env.mongodb,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
      })
        .then(()=> {
            console.log('Connected to MongoDB')
            return true;
        })
        .catch((err) => {
            console.error(err);
            return false;
        });
}

async function disconnectToMongoDB(){
    await mongoose.connection.close(()=>{
        console.log("Disconnected to MongoDB");
    });
}

async function saveNewUser(req){
    let user = new User({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        role: req.body.role.toUpperCase(),
        createdAt : Date.now(),
        createdBy : req.body.createdBy_email
    });
    const salt = await bcrypt.genSalt(10);
    user.password =await bcrypt.hash(user.password,salt);   

    return await user.save();
}

async function findByQuery(query){
    return await User.find(query);
}

async function updateone(query,set){
    return await User.updateOne(query,set);
}

async function saveToken(req){
    token = new Token({
        token: req.header('auth_token')
    });
    return await token.save();
}

async function findToken(query){
    return await Token.find(query);
}

module.exports = { saveNewUser,findByQuery,updateone,connectToMongoDB,disconnectToMongoDB,saveToken,findToken };