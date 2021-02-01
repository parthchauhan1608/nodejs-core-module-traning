const dao = require("./userDao");
const response = require("./userResponseHandler");
const validate = require("./validateUser");
const { role } = require("./constant");

async function mongo_connection_establish(){
    const connected = await dao.connectToMongoDB();
    if(connected){
        return false;
    }
    else{
        return response.mongoConnectionError();
    }
}

async function mongo_disconnect(){
    await dao.disconnectToMongoDB();
}

async function createUser(req){
    user = await dao.saveNewUser(req);
    if(user){
        return response.success(user);
    }
    else{
        return response.queryNotPerform();
    }
}

async function checkUserRegister(email){
    return await dao.findByQuery({ email : email });
}

async function signIn(user){
    const token =await validate.generateAuthToken(user);
    if(token){
        let res = response.successLogin();
        res.token = token;
        return res;
    }
    else{
        return response.internalError();
    }
}

async function getUSerByRole(req){
    token = await dao.findToken({ token : req.header('auth_token') });
    if(token[0]){
        return response.expireToken();
    }
    else{
        let decoded = req.body.decoded;
        let user;
        if(decoded.role == role.King){
            user = await dao.findByQuery({ role: {$in: role.King_access}});
        }
        else if(decoded.role == role.Queen){
            user = await dao.findByQuery({ role: {$in: role.Queen_access}});
        }
        else if(decoded.role == role.Male){
            user = await dao.findByQuery({ role: {$in: role.Male_access}});
        }
        else if(decoded.role == role.Female){
            user = await dao.findByQuery({ role: {$in: role.Female_access}});
        }
        else{
            return response.internalError();
        }
    
        if(user[0]){
            return response.success(user);
        }
        else{
            return response.dataNotFound();
        }
    }
}

async function updateUser(req){
    token = await dao.findToken({ token : req.header('auth_token') });
    if(token[0]){
        return response.expireToken();
    }
    else{
        req.body.editedAt = Date.now();
        req.body.editedBy = req.body.token.email;
        let user = await dao.updateone({ email : req.query.email },{ $set : req.body });
        if(user){
            user = await dao.findByQuery({ email : req.query.email });
            return response.success(user);
        }
        else{
            return response.mongoQueryError();
        }
    }
}

async function blockUser(req){
    token = await dao.findToken({ token : req.header('auth_token') });
    if(token[0]){
        return response.expireToken();
    }
    else{
        let editedBy = req.body.token.email;
        let user = await dao.updateone({ email : req.params.email },{ $set : { status : false, editedBy:editedBy,editedAt : Date.now() } });
        if(user){
            user = await dao.findByQuery({ email : req.params.email });
            return response.success(user);
        }
        else{
            return response.mongoQueryError();
        }
    }
}

async function logout(req){
    token = await dao.findToken({ token : req.header('auth_token') });
    if(token[0]){
        return response.expireToken();
    }
    else{
        data = await dao.saveToken(req);
        return response.success(data);
    }
}

async function checkTokenValidOrNot(req){
    token = await dao.findToken({ token : req.header('auth_token') });
    if(token[0]){
        return response.expireToken();
    }
    else{
        return false;
    }
}

module.exports = { mongo_connection_establish,mongo_disconnect,createUser,checkUserRegister,signIn,getUSerByRole,updateUser,blockUser,logout,checkTokenValidOrNot };