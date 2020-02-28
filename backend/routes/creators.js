const router = require('express').Router();
const Creator = require('../models/creator.model');

// Get all creators
router.route('/').get((req, res) => {
  Creator.find()
    .then(creators => res.json(creators))
    .catch(err => res.status(400).json('Error: ' + err));
});

//Add a new creator
router.route('/add').post((req, res) => {
  const userName = req.body.userName;
  const email = req.body.email;

  const newCreator = new Creator({ username, email });

  newOwner.save()
    .then(() => res.json('Creator added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
