const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const optionSchema = new Schema({
  description: { type: String, required: true},
  votes: { type: Number, default: 0 }
}, {
  timestamps: true
});

const pollSchema = new Schema({
  description: { type: String, required: true },
  options: [optionSchema]
}, {
  timestamps: true
});

const Poll = mongoose.model('Poll', pollSchema);

module.exports = Poll;
