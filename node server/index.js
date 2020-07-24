// server for our chat app
const io = require('socket.io')(7000)
const users = {}

io.on('connection', socket =>{
    socket.on('new-user-joined', name =>{
        // console.log(name+ ' joined')
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name)
    })
    socket.on('send', message =>{
        socket.broadcast.emit('recieve', {message: message, name: users[socket.id]})
    })
    socket.on('disconnect', () =>{
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    })
})