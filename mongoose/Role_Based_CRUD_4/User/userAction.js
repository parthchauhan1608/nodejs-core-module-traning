const service = require("./userService");
const response = require("./userResponseHandler");
const validate = require("./validateUser");
const bcrypt = require("bcrypt");

async function createUser(req){
    let error_Connection = await service.mongo_connection_establish();
    if(error_Connection){
        return error_Connection;
    }
    if(req.header('auth_token')){
        let error_Token =await service.checkTokenValidOrNot(req);
        if(error_Token){
            await service.mongo_disconnect();
            return error_Token;
        } 
    }
    let registered = await service.checkUserRegister(req.body.email);
    if(registered[0]){
        await service.mongo_disconnect();
        return response.alreadyRegisteredUser();
    }
    else{
        let new_User = await service.createUser(req);
        await service.mongo_disconnect();
        return new_User;
    }
}

async function signIn(req){
    let error_Connection = await service.mongo_connection_establish();
    if(error_Connection){
        return error_Connection;
    }
    let data = await service.checkUserRegister(req.body.email);
    if(!data[0]){
        await service.mongo_disconnect();
        return response.newUserRegisterFirst();
    }
    else{
        const validPassword = await bcrypt.compare(req.body.password, data[0].password);
        if (!validPassword) {
            return response.invalidPassword();
        }
        await service.mongo_disconnect();
        return await service.signIn(data[0]);
    }
}

async function getUSerByRole(req){
    let error_Connection = await service.mongo_connection_establish();
    if(error_Connection){
        return error_Connection;
    }
    let user_dataByRole = await service.getUSerByRole(req);
    await service.mongo_disconnect();
    return user_dataByRole;
}

async function updateUserByRole(req){
    let error_Connection = await service.mongo_connection_establish();
    if(error_Connection){
        return error_Connection;
    }
    let data = await service.checkUserRegister(req.query.email);
    if(!data[0]){
        await service.mongo_disconnect();
        return response.newUserRegisterFirst();
    }
    else{
        let valid_role = await validate.validaterole(data[0].role,req.body.token.role);
        if(!valid_role){
            let token = req.body.token;
            if(token._id == data[0]._id){
                let updated_User = await service.updateUser(req);
                await service.mongo_disconnect();
                return updated_User;
            }
           return response.invalidUserRole();
        }
        else{
            let updated_User = await service.updateUser(req);
            await service.mongo_disconnect();
            return updated_User
        }
    }
}

async function blockUserByRole(req){
    let error_Connection = await service.mongo_connection_establish();
    if(error_Connection){
        return error_Connection;
    }
    let error_Token =await service.checkTokenValidOrNot(req);
    if(error_Token){
        await service.mongo_disconnect();
        return error_Token;
    } 
    else{
        let data = await service.checkUserRegister(req.params.email);
        if(!data[0]){
            await service.mongo_disconnect();
            return response.newUserRegisterFirst();
        }
        else{
            let valid_role = await validate.validaterole(data[0].role,req.body.token.role);
            if(!valid_role){
                let token = req.body.token;
                if(token._id == data[0]._id){
                    return await service.blockUser(req);
                }
               return response.invalidUserRole();
            }
            else{
                return await service.blockUser(req);
            }
        }
    }
}

async function logout(req){
    let error_Connection = await service.mongo_connection_establish();
    if(error_Connection){
        return error_Connection;
    }
    let error_Token =await service.checkTokenValidOrNot(req);
    if(error_Token){
        return error_Token;
    } 
    else{ 
        return await service.logout(req);
    }
}

module.exports = { createUser,signIn,getUSerByRole,updateUserByRole,blockUserByRole,logout };