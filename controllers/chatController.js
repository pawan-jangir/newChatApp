const moment = require('moment');
const mongoose = require('mongoose');
const Chat  = require('../model/Chat');

exports.get_chats = async (req, res, next) => {
    try {
        let userName = req.body && req.body.name ? req.body.name : ''
        let findQuery = {
            $or : [
                {"from" : { "$in": [userName] }},
                {"to" : { "$in": [userName] }},
            ]
        }
        let allChats = await Chat.find(findQuery)
        console.log(req.body)
         returndata = {
            message : 'This is a test api call',
            success : true,
            data : allChats,
        }
        return res.json(returndata)

    } catch (error) {
        next(error);
    }
};