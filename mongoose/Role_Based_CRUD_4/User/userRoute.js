const action = require("./userAction");
const middleware = require("./userMiddleware");
const express = require("express");
const router = express.Router();

router.post('/register',[middleware.createUser],async (req,res)=>{
    let result = await action.createUser(req);
    res.status(result.http_code).send(result.message);
});

router.post('/login',[middleware.login], async (req, res) => {
    let result = await action.signIn(req);
    res.header('auth_token', result.token).status(result.http_code).send(result.message);
});

router.get('/details',[middleware.getUserDetailByRole],async (req,res)=>{
    let result = await action.getUSerByRole(req);
    res.status(result.http_code).send(result.message);
});

router.post('/createUser',[middleware.validateUserRole,middleware.createUser],async (req,res)=>{
    let result = await action.createUser(req);
    res.status(result.http_code).send(result.message);
});

router.put('/updateUser',[middleware.validateUserRole,middleware.updateUserByRole],async (req,res)=>{
    let result = await action.updateUserByRole(req);
    res.status(result.http_code).send(result.message);
});

router.patch('/blockUser/:email',[middleware.validateUserRole],async (req,res)=>{
    let result = await action.blockUserByRole(req);
    res.status(result.http_code).send(result.message);
});

router.post('/logout',[middleware.validateToken],async(req,res)=>{
    let result = await action.logout(req);
    res.status(result.http_code).send(result.message);
});

module.exports = router;