const express = require('express');
const {registerUser, authUser, allUsers} =require('../controller/userControllers.js');
const { protect } = require('../middlewares/authMiddleware.js');
const router=express.Router();


router.post('/login',authUser);
router.post('/',registerUser);
router.get('/',protect, allUsers);

module.exports=router;