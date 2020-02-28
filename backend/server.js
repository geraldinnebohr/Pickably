const express = require('express');

// manage APIs with express
const cors = require('cors');
// allows connection with our database
const mongoose = require('mongoose');

// manage environment variables
require('dotenv').config();

// create express server
const app = express();
// port where the server will be
const port = process.env.PORT || 5500;

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
const roomRouter = require('./routes/room')
//const creatorRouter = require('./routes/creators');

app.use('/questionary', questionaryRouter);
app.use('/room', roomRouter);
//app.use('/creator', creatorRouter);

// what starts the server listening at a certain
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});