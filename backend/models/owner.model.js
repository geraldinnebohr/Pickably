const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ownerSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
}, {
    //support date time format
  timestamps: true,
});

const Owner = mongoose.model('Owner', ownerSchema);

module.exports = Owner;