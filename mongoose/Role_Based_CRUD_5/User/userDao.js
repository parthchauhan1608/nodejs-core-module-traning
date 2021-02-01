require("dotenv").config();
const { User,Token } = require("./userSchema");
const mongoose = require('mongoose');

async function connectToMongoDB(){
    return await mongoose.connect(process.env.mongodb,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
      });
}

async function disconnectToMongoDB(){
    await mongoose.connection.close();
}

async function saveNewUser(user){
    await connectToMongoDB();
    user = await user.save();
    await disconnectToMongoDB();
    return user;
}

async function find(query,select){
    await connectToMongoDB();
    let user = await User.find(query).select(select);
    await disconnectToMongoDB();
    return user;
}

async function findOne(query,select){
    await connectToMongoDB();
    let user = await User.findOne(query).select(select);
    await disconnectToMongoDB();
    return user;
}

async function update(query,set,select){
    await connectToMongoDB();
    let user = await User.findOneAndUpdate(query,set,{new: true}).select(select);
    await disconnectToMongoDB();
    return user;
}

async function saveToken(token){
    await connectToMongoDB();
    token = await token.save();
    await disconnectToMongoDB();
    return token;
}

async function findToken(query){
    await connectToMongoDB();
    let token = await Token.findOne(query);
    await disconnectToMongoDB();
    return token;
}

module.exports = { saveNewUser,find,findOne,update,saveToken,findToken };