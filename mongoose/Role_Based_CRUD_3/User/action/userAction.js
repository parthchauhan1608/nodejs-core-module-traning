const service = require("../service/userService");

var res;

async function signIn(req){
    res = await service.signIn(req);
    return res;
}

async function getUSerByRole(req){
    res = await service.getUSerByRole(req);
    return res;
}

async function createUser(req){
    res = await service.createUser(req);
    return res;
}

async function updateUserByRole(req){
    if(req.body._id){
        res = await service.updateUserById(req);
        return res;
    }
    else{
        res = await service.updateUserByEmail(req);
        return res;
    }
}

async function blockUserByRole(req){
    if(req.body._id){
        res = await service.blockUserById(req);
        return res;
    }
    else{
        res = await service.blockUserByEmail(req);
        return res;
    }
}

async function logout(req){
    res = await service.logout(req);
    return res;
}

module.exports = { signIn,getUSerByRole,createUser,updateUserByRole,blockUserByRole,logout }