const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  // emit event to client
  // socket.emit('newMessage', { // emit to single connection
  //   from: 'Server 01',
  //   text: 'Content from server 01',
  //   createdAt: 123
  // });

  // Listen for event from client
  socket.on('createMassage', (message) => {
    console.log('createMassage', message);
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    }) //emit to every single connection
  });

  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
