const mongoose = require('mongoose');
const moment = require('moment');

//Create a schema
const ChatSchema = new mongoose.Schema({
    from: { type: String, default: '' },
    to: { type: String, default: '' },
    message: { type: String, default: '' },
    date: { type: String, default: moment().format("YYYY-MM-DD") },
    time: { type: String, default: moment().format("hh:mm a") }
},{ timestamps: true });

ChatSchema.pre('save', async function(next) {
    try {
        next();
    } catch (error) {
        next(error);
    }
});

const Chat = mongoose.model('Chat', ChatSchema);
module.exports = Chat;

