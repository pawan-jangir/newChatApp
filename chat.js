module.exports = function(app, io, ss) {
    let chat = io.of('/').on('connection',(socket) => {
        console.log("connection established with socket")
        require('./controllers/conversation.socket')(app, io, socket);
    });
  }