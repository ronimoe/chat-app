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


  // Listen for event from client
  socket.on('createMassage', (message, callback) => {
    console.log('createMassage', message);
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback('This is from the server');
  });

  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
