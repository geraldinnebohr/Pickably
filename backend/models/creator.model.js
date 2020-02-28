const mongoose = require('mongoose');
require('mongoose-type-email');

const Schema = mongoose.Schema;

const creatorSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    email: {
      type: mongoose.SchemaTypes.Email,
      required: true,
      unique: true,
      trim: true
    }
  },
  {
  // support date time format
  timestamps: true
  }
);

const Creator = mongoose.model('Creator', creatorSchema);

module.exports = Creator;
