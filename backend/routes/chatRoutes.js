const express = require('express');
const { protect } = require('../middlewares/authMiddleware');
const { accessChat, fetchChats, createGroupChat, renameGroup, removeFromGroup, addToGroup } = require('../controller/chatController');

const router=express.Router();



router.post('/',protect, accessChat);
router.get('/',protect, fetchChats);
router.post('/group',protect, createGroupChat);
router.put('/rename',protect, renameGroup);
router.put('/group-remove',protect, removeFromGroup);
router.put('/group-add',protect, addToGroup);

module.exports=router;