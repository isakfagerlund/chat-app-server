const app = require('express')();
const http = require('http').Server(app);
var io = require('socket.io')(http);
const port = process.env.PORT || 4001;

var numUsers = 1;

var usersOnline = [];

io.on('connection', function(socket){
  console.log('a user connected');
  socket.emit('login', {
    usersOnline: usersOnline
  });

  socket.on('chat message', function(msg){
    socket.broadcast.emit('chat message', msg);
  });

  socket.on('add user', function (username){
    socket.username = username;
    usersOnline.push(socket.username);
    console.log(socket.username);
    socket.broadcast.emit('user joined', {
      username: socket.username,
      usersOnline: usersOnline
    });
    console.log(usersOnline);
  });

  socket.on('disconnect', function(){
    usersOnline = usersOnline.filter(item => item !== socket.username)
    socket.broadcast.emit('user left', {
      username: socket.username,
      usersOnline: usersOnline
    });
    console.log(`${socket.username} disconnected`);
    console.log(usersOnline);
  });
});
  
http.listen(port, () => console.log(`Listening on ${ port }`));
      
