let ioInstance = null;

const initSocket = (server) => {
  const { Server } = require('socket.io');

  ioInstance = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL || 'http://localhost:5173',
      methods: ['GET', 'POST', 'PUT', 'DELETE']
    }
  });

  ioInstance.on('connection', (socket) => {
    console.log('[Socket.io] Client connected:', socket.id);

    socket.on('temp_lock_slot', (data) => {
      socket.broadcast.emit('slot_temp_locked', data);
    });

    socket.on('release_lock_slot', (data) => {
      socket.broadcast.emit('slot_lock_released', data);
    });

    socket.on('client_slot_status_updated', (data) => {
      ioInstance.emit('slot_status_updated', data);
    });

    socket.on('disconnect', () => {
      console.log('[Socket.io] Client disconnected:', socket.id);
    });
  });

  return ioInstance;
};

const getIO = () => ioInstance;

module.exports = { initSocket, getIO };