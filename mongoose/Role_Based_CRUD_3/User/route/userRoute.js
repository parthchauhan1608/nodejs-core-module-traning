const action = require("../action/userAction");
const middleware = require("../middleware/userMiddleware");
const express = require("express");
const router = express.Router();

var result;
router.post('/register',[middleware.createUser],async (req,res)=>{
    result = await action.createUser(req);
    res.status(result.http_code).send(result.message);
});

router.post('/login',[middleware.login], async (req, res) => {
    result =await action.signIn(req);
    res.header('auth_token', result.token).status(result.http_code).send(result.message);
});

router.get('/details',[middleware.getUserDetailByRole],async (req,res)=>{
    result =await action.getUSerByRole(req,res);
    res.status(result.http_code).send(result.message);

});

router.post('/createUser',[middleware.validateUserRole,middleware.createUser],async (req,res)=>{
    result =await action.createUser(req);
    res.status(result.http_code).send(result.message);

});

router.put('/updateUser',[middleware.updateUserByRole],async (req,res)=>{
    result =await action.updateUserByRole(req);
    res.status(result.http_code).send(result.message);

});

router.patch('/blockUser/:email',[middleware.blockUserByRole],async (req,res)=>{
    result =await action.blockUserByRole(req);
    res.status(result.http_code).send(result.message);
});

router.post('/logout',async(req,res)=>{
    result =await action.logout(req);
    res.status(result.http_code).send(result.message);

});

module.exports = router;