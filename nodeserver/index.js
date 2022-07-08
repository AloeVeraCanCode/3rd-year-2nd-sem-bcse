const io=require('socket.io')(8000,{
    cors: {
      origin: '*',
    }
  });
let users={};
let i=0;
console.log("Hello1!");
io.on('connection', socket => {
    //console.log("Hello!");
    socket.on('newly-joined', myname=>{
        //console.log("Hello!");
        console.log('UserJoined '+myname);
         users[socket.id]=myname;
         socket.broadcast.emit('UserJoined',myname);//tell everybody Except this user 
    });
    socket.on("message-sent",message=>{
        socket.broadcast.emit('receive',{m:message,name:users[socket.id]});
    });
  socket.on('user image', function (msg) {
    //console.log(`${users[socket.id]}+${i}`);i=i+1;
    socket.broadcast.emit('user image', users[socket.id], msg);
  });
});
