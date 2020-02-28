const mongoose = require('mongoose');
const ShortId = require('mongoose-shortid');

const Schema = mongoose.Schema;

const playerSchema = new Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  score: {
    type: Number,
    default: 0 
  }
});

const roomSchema = new Schema(
  {
    _id: {
      type: ShortId,
      len: 6,
      alphabet: undefined
    },
    qtryId: {
      type: String,
      required: true
    },
    players: [playerSchema]
  },
  {
  // support date time format
  timestamps: true
  }
);

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
