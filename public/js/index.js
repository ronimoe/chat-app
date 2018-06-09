const socket = io();

socket.on('connect', function () {
  console.log('Connected to server');

  // Emit event to server
  socket.emit('createMassage', {
    from: 'Keyence',
    text: 'This is data from client'
  });
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

// Listen event from server
socket.on('newMessage', function(message){
  console.log('newMessage', message);
});

