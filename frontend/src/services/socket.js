
import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'https://smartpark-backend-y92b.onrender.com';

export const socket = io(SOCKET_URL, {
    autoConnect: true,
    reconnection: true,
    reconnectionAttempts: 10,
    reconnectionDelay: 1000,
    timeout: 20000,
    withCredentials: true,
    transports: ['websocket', 'polling']
});

socket.on('connect', () => {
    console.log('SmartPark socket connected:', socket.id);
});

socket.on('connect_error', (error) => {
    console.error('Socket connection error:', error.message);
});

socket.on('disconnect', (reason) => {
    console.log('Socket disconnected:', reason);
});
