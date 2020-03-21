const router = require('express').Router();
const Questionary = require('../models/questionary.model');
const Room = require('../models/room.model');

// ---------- ROOM ---------- //

// Get room info
router.route('').get((req, res) => {
  res.redirect('/home')
});

router.route('/login').get((req, res) => {
  res.redirect('/login')
});

router.route('/signup').get((req, res) => {
  res.redirect('/signup')
});

// Export routes
module.exports = router;