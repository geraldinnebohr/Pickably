const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shortid = require('shortid');

const answerSchema = new Schema({
    description: { type: String, required: true },
    value: { type: Boolean, default: false },
    votes: { type: Number, default: 0 }
  });
  
  const questionSchema = new Schema({
    description: { type: String, required: true },
    answers: [answerSchema]
  });
  
  const questionarySchema = new Schema({
    description: { type: String, required: true },
    questions: [questionSchema]
  }, {
    timestamps: true
});

const playerSchema = new Schema(
    {
        userName: {
            type: String,
            required: true,
            trim: true,
        },
        score: {
            type: Number,
            default: 0 
        }
    },
    {
    timestamps: true
    }
);


const roomSchema = new Schema(
    {
        _id: {
            'type': String,
            'default': shortid.generate
        },
        questionary: questionarySchema,
        players: [playerSchema],
    },
    {
    // support date time format
    timestamps: true
    }
);

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
