const service = require("../service/userService");

function signUp(req,res){
    service.checkAlreadyUserRegister(req,res);
    service.createUser(req,res);
}

function signIn(req,res){
    const user = service.checkNewUser(req,res);
    service.signIn(req,res);
}

function getUSerByRole(req,res){
    service.getUSerByRole(req,res);
}

function createUserByRole(req,res){
    service.checkAlreadyUserRegister(req,res);
    service.createUser(req,res);
}

function updateUserByRole(req,res){
    if(req.body._id){
        service.updateUserById(req,res);
    }
    else{
        service.updateUserByEmail(req,res);
    }
}

function deleteUserByRole(req,res){
    if(req.body._id){
        service.deleteUserById(req,res);
    }
    else{
        service.deleteUserByEmail(req,res);
    }
}

function logout(req,res){
    service.logout(req,res);
}

module.exports = { signUp,signIn,getUSerByRole,createUserByRole,updateUserByRole,deleteUserByRole,logout }