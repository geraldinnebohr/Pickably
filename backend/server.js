const express = require('express');
const http = require('http')
const socketIO = require('socket.io')


// manage APIs with express
const cors = require('cors');
// allows connection with our database
const mongoose = require('mongoose');

// manage environment variables
require('dotenv').config();

// port where the server will be
const port = process.env.PORT || 4001;

// create express server
const app = express();

// cors middleware that allow us to parse json because the server will be sending and receiving json
app.use(cors());
app.use(express.json());

// database uri which enables connection with our database
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);
const connection = mongoose.connection;

// once the connection is open is gonna display the message
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

const questionaryRouter = require('./routes/questionaries');
//const roomRouter = require('./routes/room')
//const creatorRouter = require('./routes/creators');

app.use('/questionary', questionaryRouter);
//app.use('/room', roomRouter);
//app.use('/creator', creatorRouter);

// our server instance
const server = http.createServer(app);

// This creates our socket using the instance of the server
const io = socketIO(server);

// This is what the socket.io syntax is like, we will work this later
io.on('connection', socket => {
  console.log('User connected')
  
  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

server.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});