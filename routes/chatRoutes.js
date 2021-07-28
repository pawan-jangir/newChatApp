const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
console.log(1212)
router.post('/get_chats', chatController.get_chats);

module.exports = router;