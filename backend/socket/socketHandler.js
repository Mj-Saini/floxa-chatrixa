// socket/socketHandler.js

const queue = [];
const rooms = new Map(); // roomId => [socketId1, socketId2]
import { v4 as uuidv4 } from "uuid";

export const handleSocketConnection = (socket, io) => {
  console.log('🔌 Connected:', socket.id);

  socket.on('find_stranger', () => {
    console.log('📡 Finding stranger for:', socket.id);
    if (queue.length > 0) {
      const partnerSocketId = queue.shift();
      const roomId = uuidv4();
      rooms.set(roomId, [socket.id, partnerSocketId]);
      socket.join(roomId);
      io.sockets.sockets.get(partnerSocketId)?.join(roomId);
      // Notify both users
      io.to(socket.id).emit('stranger_found', { roomId, partnerSocketId });
      io.to(partnerSocketId).emit('stranger_found', { roomId, partnerSocketId: socket.id });
      console.log(`🤝 Matched ${socket.id} <--> ${partnerSocketId} in room ${roomId}`);
    } else {
      queue.push(socket.id);
      console.log('🕒 Added to queue:', socket.id);
    }
  });

  socket.on('send_message', ({ roomId, message }) => {
    if (rooms.has(roomId)) {
      socket.to(roomId).emit('receive_message', {
        message,
        sender: socket.id,
        roomId,
      });
    }
  });

  socket.on('disconnect', () => {
    console.log('❌ Disconnected:', socket.id);
    // Remove from queue if waiting
    const idx = queue.indexOf(socket.id);
    if (idx !== -1) queue.splice(idx, 1);
    // Remove from rooms
    for (const [roomId, members] of rooms.entries()) {
      if (members.includes(socket.id)) {
        rooms.delete(roomId);
        socket.to(roomId).emit('stranger_disconnected');
      }
    }
  });
};
