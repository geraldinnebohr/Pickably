const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shortid = require('shortid');

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

    © 2020 GitHub, Inc.
    Terms
    Privacy
    Security
    Status
    Help

    Contact GitHub
    Pricing
    API
    Training
    Blog
    About

