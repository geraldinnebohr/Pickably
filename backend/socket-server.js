exports.initGame = function(sio, socket) {
    io = sio;
    const gameSocket = socket;

    gameSocket.emit('connected', { message: "You are connected!" });

    // Host(User) Events
    gameSocket.on('hostCreateNewRoom', hostCreateNewRoom);

    // Player Events
    gameSocket.on('playerJoinRoom', playerJoinRoom);

}

// HOST / USER
function hostCreateNewRoom(roomId) {
    // >>> AQUI CODIGO PARA CREAR UNA
    //    NUEVA ROOM <<<

    // Return room and socket id
    this.emit('newRoom', { roomId: roomId, mySocketId: this.id });

    // Join the room
    this.join(roomId);

    console.log('New room created: ' + roomId)
};

// PLAYER
function playerJoinRoom(data) {
    const sock = this;

    sock.join(data.roomId);
    console.log('player jonied')
    io.sockets.in(data.roomId).emit('playerJoinRoom', data);
}