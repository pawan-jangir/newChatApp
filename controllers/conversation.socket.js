const Mongoose = require('mongoose')
var ObjectId = Mongoose.Types.ObjectId;
const Chat = require('../model/Chat');
const OnlineUsers = require('../model/OnlineUsers');
const moment = require('moment');
module.exports = function (app, io, socket) {
    //Collect message and insert into database
    socket.on('chatMessage', async(data) =>{ //recieves message from client-end along with sender's and reciever's details
        var dataElement = {
            from:data.fromUser,
            to:data.toUser,
            message:data.msg,
            date : moment().format("YYYY-MM-DD"),
            time : moment().format("hh:mm a"),
        };
        await Chat.create(dataElement)
        socket.emit('message',dataElement); //emits message back to the user for display
        let onlineUser = await OnlineUsers.findOne({"name":data.toUser})
        //if the recipient is found online, the message is emmitted to him/her
        if(onlineUser){
            socket.to(res.ID).emit('message',dataElement);
        } 
    });

    socket.on('userDetails',async(data) => { //checks if a new user has logged in and recieves the established chat details
        var onlineUser = { //forms JSON object for the user details
            "ID":socket.id,
            "name":data.fromUser
        };
        console.log(onlineUser)
        await Chat.create(onlineUser)
        
        let chatRes = await Chat.find({ //finds the entire chat history between the two people
            "from" : { "$in": [data.fromUser, data.toUser] },
            "to" : { "$in": [data.fromUser, data.toUser] }
        },{projection: {_id:0}})
        socket.emit('output',chatRes); //emits the entire chat history to client  
    });  
    var userID = socket.id;
    socket.on('disconnect', async() => {
        var myquery = {"ID":userID};
        await OnlineUsers.deleteOne(myquery, function(err, res) { //if a user has disconnected, he/she is removed from the online users' collection
            if (err) throw err;
            console.log("User " + userID + "went offline...");
        });
    });

}