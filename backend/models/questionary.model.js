const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const answerSchema = new Schema({
    description: { type: String, required: true },
    value: { type: Boolean, default: false }
});

const questionSchema = new Schema({
    description: { type: String, required: true },
    answers: [answerSchema]
});

const questionarySchema = new Schema({
    description: { type: String, required: true },
    questions: [questionSchema],
    }, {
        timestamps: true,
    });

const Questionary = mongoose.model('Questionary', questionarySchema);
const Question = mongoose.model('Question', questionSchema);
const Answer = mongoose.model('Answer', answerSchema);

module.exports = Questionary;
//module.exports = Question;
//module.exports = Answer;