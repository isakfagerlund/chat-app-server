const app = require('express')();
const http = require('http').Server(app);
var io = require('socket.io')(http);

var numUsers = 1;

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('chat message', function(msg){
    socket.broadcast.emit('chat message', msg);
  });

  socket.on('add user', function (username){
    socket.username = username;
    console.log(socket.username);
    socket.broadcast.emit('user joined', {
      username: socket.username
    });
  });

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});
  
http.listen(7777, function(){
  console.log('listening on *:7777');
});
      