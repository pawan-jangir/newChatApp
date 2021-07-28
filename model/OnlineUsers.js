const mongoose = require('mongoose');

//Create a schema
const OnlineUsersSchema = new mongoose.Schema({
    ID: { type: String, default: '' },
    name: { type: String, default: '' },
},{ timestamps: true });

OnlineUsersSchema.pre('save', async function(next) {
    try {
        next();
    } catch (error) {
        next(error);
    }
});

const OnlineUsers = mongoose.model('OnlineUsers', OnlineUsersSchema);
module.exports = OnlineUsers;

