const io = require('socket.io-client')

export default function () {
    const socket = io.connect('http://localhost:5500');

    function join(data) {
        socket.emit('playerJoinRoom', data);
        console.log('client will join')
        window.location.href = './loading'
    }

    return {
        join
    }
}