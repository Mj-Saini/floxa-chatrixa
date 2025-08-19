// socket/socketHandler.js
const waitingQueue = [];

export const handleSocketConnection = (socket, io) => {
  console.log(`🟢 User connected: ${socket.id}`);

  socket.on('find_stranger', () => {
    console.log(`🔍 ${socket.id} is looking for a stranger`);

    if (waitingQueue.length > 0) {
      const strangerId = waitingQueue.shift(); // get waiting user
      const roomId = `${socket.id}#${strangerId}`;

      // Join both users to the same room
      socket.join(roomId);
      io.to(strangerId).socketsJoin(roomId);

      // Notify both users
      io.to(roomId).emit('stranger_found', { roomId });
      console.log(`✅ Matched ${socket.id} with ${strangerId} in room ${roomId}`);
    } else {
      waitingQueue.push(socket.id);
      console.log(`🕐 No stranger found, added ${socket.id} to queue`);
    }
  });

  socket.on('send_message', ({ roomId, message }) => {
    io.to(roomId).emit('receive_message', { message, sender: socket.id });
    console.log(`📤 ${socket.id} sent message to room ${roomId}: ${message}`);
  });

  socket.on('disconnect', () => {
    console.log(`🔴 ${socket.id} disconnected`);

    // Remove from waiting queue if present
    const index = waitingQueue.indexOf(socket.id);
    if (index !== -1) {
      waitingQueue.splice(index, 1);
      console.log(`❌ Removed ${socket.id} from queue`);
    }
  });
};
