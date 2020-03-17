exports.initGame = function(sio, socket) {
    const io = sio;
    const gameSocket = socket;

    gameSocket.emit('connected', { message: "You are connected!" });

    // Host(User) Events
    gameSocket.on('hostCreateNewRoom', hostCreateNewRoom);

    // Player Events
}

function hostCreateNewRoom() {
    // >>> AQUI CODIGO PARA CREAR UNA
    //    NUEVA ROOM <<<

    // Room's id
    const rId = 'YQJvMjl0';

    // Return room and socket id
    this.emit('newRoom', { roomId: rId, mySocketId: this.id });

    // Join the room
    this.join(rId);

    console.log('New room created')
};