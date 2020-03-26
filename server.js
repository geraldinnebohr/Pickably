const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override');

const User = require('./models/user.model');
const passport = require('passport');
const LocalStrategy = require("passport-local").Strategy;
const passportLocalMongoose = require("passport-local-mongoose");

const bodyParser = require("body-parser");

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


app.use(bodyParser.urlencoded({extended:true}));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get('/', (req, res) => {
  res.redirect('/play');
});

app.get('/home', checkAuthenticated,(req, res) => {
  res.sendFile(path.join(__dirname, "socket-client", "build", "index.html"));
});

app.get('/edit', checkAuthenticated,(req, res) => {
  res.sendFile(path.join(__dirname, "socket-client", "build", "index.html"));
});


app.get('/login', checkNotAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, "socket-client", "build", "index.html"));
});

app.get('/signup', checkNotAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, "socket-client", "build", "index.html"));
});

app.get('/play', checkNotAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, "socket-client", "build", "index.html"));
});

app.post('/register', function(req, res) {

  User.register(new User({
      username: req.body.username,
      email: req.body.email
  }),
  req.body.password,
  function(err, user){
    if(err){   
      res.redirect('/signup');        
    }
    else { 
      res.redirect('/login');
    } 
  });
});
  
app.post('/signin', passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/login',
    //failureFlash: true
  }), function(req, res){
    res.send("User is "+ req.user.id);
});

app.delete('/logout', (req, res) => {
  req.logOut()
  res.redirect('/login')
})

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }

  res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/home')
  }
  next()
}

// ---------- OTHER ROUTES ----------

const questionaryRouter = require('./routes/questionaries');
const roomRouter = require('./routes/room')
const pollRouter = require('./routes/poll')
//const userRouter = require('./routes/user');

app.use('/questionary', questionaryRouter);
app.use('/room', roomRouter);
app.use('/poll', pollRouter);
//app.use('/user', userRouter);

// ---------- SOCKET SIGNALS ----------

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
// app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "socket-client", "build", "index.html"));
// });

app.get("*", (req, res, next) => {
  res.sendFile(path.join(__dirname, "socket-client", "build", "index.html"));
});

server.listen(port, () => console.log(`Listening on port ${port}`))