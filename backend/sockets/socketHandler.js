
let ioInstance = null;

const initSocket = (server) => {
  const { Server } = require('socket.io');

  const allowedOrigins = (
    process.env.CLIENT_URL || 'http://localhost:5173'
  )
    .split(',')
    .map(origin => origin.trim())
    .filter(Boolean);

  ioInstance = new Server(server, {
    cors: {
      origin: allowedOrigins,
      methods: ['GET', 'POST'],
      credentials: true
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
