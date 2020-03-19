const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

// manage APIs with express
const cors = require('cors');
// allows connection with our database
const mongoose = require('mongoose');

// manage environment variables
require('dotenv').config();

// our localhost port
const port = process.env.PORT || 5500;

const app = express();

// cors middleware that allow us to parse json because the server will be sending and receiving json
app.use(cors());
app.use(express.json());

// database uri which enables connection with our database
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true , autoIndex: false });
const connection = mongoose.connection;

// once the connection is open is gonna display the message
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

const questionaryRouter = require('./routes/questionaries');
const roomRouter = require('./routes/room')
const pollRouter = require('./routes/poll')

//const creatorRouter = require('./routes/creators');

app.use('/questionary', questionaryRouter);
app.use('/room', roomRouter);
app.use('/poll', pollRouter);
//app.use('/creator', creatorRouter);

// our server instance
const server = http.createServer(app)

// This creates our socket using the instance of the server
const io = socketIO(server)

//const pickably = require('./socket-server')

// This is what the socket.io syntax is like, we will work this later
io.on('connection', socket => {

  socket.on('room', (room) => {
    socket.join(room);
    console.log('<<< Client connected in room: ' + room)
    //io.sockets.in(room).emit('message', 'what is going on, party people?');
  })

  socket.on('newPlayer', (room) => {
    console.log('<<< newPlayer: ' + room);
    io.sockets.in(room).emit('updatePlayersList', room);
  })

  socket.on('playerVotes', (data) => {
    console.log('<<< playerVotes: ' + data.room);
    io.sockets.in(data.room).emit('showButtons', data);
  })

  socket.on('timeCompleted', (data) => {
    console.log('<<< timeCompleted: ' + data.room);
    io.sockets.in(data.room).emit('startLoading', data);
  })

  socket.on('gameover', (room) => {
    console.log('<<< gameover: ' + room);
    io.sockets.in(room).emit('finishGame', room);
  })
})

// ... other imports 
const path = require("path")

// ... other app.use middleware 
app.use(express.static(path.join(__dirname, "socket-client", "build")))

// ...
// Right before your app.listen(), add this:
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "socket-client", "build", "index.html"));
});

server.listen(port, () => console.log(`Listening on port ${port}`))