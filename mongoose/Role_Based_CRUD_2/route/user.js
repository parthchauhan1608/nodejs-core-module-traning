const action = require("../action/userAction");
const middleware = require("../middleware/userMiddleware");
const express = require("express");
const router = express.Router();

router.post('/',middleware.createUser,async (req,res)=>{
    action.signUp(req,res);
});

router.post('/login',middleware.login, async (req, res) => {
    action.signIn(req,res);
});

router.get('/logged',middleware.getUserDetailByRole,async (req,res)=>{
    action.getUSerByRole(req,res);
});

router.post('/logged',[middleware.validateUserRole,middleware.createUser],async (req,res)=>{
    action.createUserByRole(req,res);
});

router.patch('/logged',[middleware.validateUserRole,middleware.updateUserByRole],async (req,res)=>{
    action.updateUserByRole(req,res);
});

router.delete('/logged',middleware.deleteUserByRole,async (req,res)=>{
    action.deleteUserByRole(req,res);
});

router.post('/logout',async(req,res)=>{
    action.logout(req,res);
});

module.exports = router;