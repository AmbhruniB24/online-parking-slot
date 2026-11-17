
let ioInstance = null;

const initSocket = (server) => {
    const { Server } = require('socket.io');

    ioInstance = new Server(server, {
        cors: {
            origin: (origin, cb) => cb(null, true),
            methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
            credentials: true
        },
        transports: ['websocket', 'polling'],
        allowEIO3: true
    });

    ioInstance.on('connection', (socket) => {
        console.log('[Socket.io] Connected:', socket.id);

        socket.on('temp_lock_slot', (data) => {
            socket.broadcast.emit('slot_temp_locked', data);
        });

        socket.on('release_lock_slot', (data) => {
            socket.broadcast.emit('slot_lock_released', data);
        });

        socket.on('client_slot_status_updated', (data) => {
            ioInstance.emit('slot_status_updated', data);
        });

        socket.on('disconnect', (reason) => {
            console.log('[Socket.io] Disconnected:', socket.id, reason);
        });
    });

    ioInstance.engine.on('connection_error', (error) => {
        console.error('[Socket.io] Connection error:', error.message);
    });

    return ioInstance;
};

const getIO = () => ioInstance;

module.exports = {
    initSocket,
    getIO
};
