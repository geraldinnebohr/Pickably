const router = require('express').Router();
const Questionary = require('../models/questionary.model');
const Room = require('../models/room.model');

// ---------- ROOM ---------- //

// Get room info
router.route('').get((req, res) => {
  res.redirect('/home')
});

// Export routes
module.exports = router;