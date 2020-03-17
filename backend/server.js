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

const passport = require('passport');
app.use(passport.initialize()); 
app.use(passport.session()); 

const User = require('./models/user.model'); 
  
const LocalStrategy = require('passport-local').Strategy; 
passport.use(new LocalStrategy(User.authenticate())); 

passport.serializeUser(User.serializeUser()); 
passport.deserializeUser(User.deserializeUser()); 

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
const userRouter = require('./routes/user')

app.use('/questionary', questionaryRouter);
app.use('/room', roomRouter);
app.use('/poll', pollRouter);
app.use('/user', userRouter);

// our server instance
const server = http.createServer(app)

// This creates our socket using the instance of the server
const io = socketIO(server)

// This is what the socket.io syntax is like, we will work this later
io.on('connection', socket => {
  console.log('New client connected')
  
  socket.on('add player', (un) => {
    console.log('Player added');
    io.sockets.emit('add player', un);
  })

  socket.on('time to vote', (i) => {
    console.log('Time to vote');
    io.sockets.emit('time to vote', i);
  })

  socket.on('question results', (i) => {
    console.log('Question results');
    io.sockets.emit('question results', i++);
  })
  
  // disconnect is fired when a client leaves the server
  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

server.listen(port, () => console.log(`Listening on port ${port}`))