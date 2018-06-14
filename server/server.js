const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./util/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  // socket.emit from admin
  socket.emit('newMessage', generateMessage('Admin', 'Welcome to new connected deviced'));
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));
  // socket.emit('newMessage', {
  //   from: 'Admin',
  //   text: 'Welcome to new connected deviced'
  // });
  // socket.broadcast.emit('newMessage', {
  //   from: 'Admin',
  //   text: 'New user joined'
  // });

  // emit event to client
  // socket.emit('newMessage', { // emit to single connection
  //   from: 'Server 01',
  //   text: 'Content from server 01',
  //   createdAt: 123
  // });

  // Listen for event from client
  socket.on('createMassage', (message) => {
    console.log('createMassage', message);
    io.emit('newMessage', generateMessage(message.from, message.text));
    // io.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // }) //emit to every single connection
    // socket.broadcast.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // }); // created emit to all socket exclude current ID
  });

  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
