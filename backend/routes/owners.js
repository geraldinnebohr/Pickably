  
const router = require('express').Router();
let Owner = require('../models/owner.model');

router.route('/').get((req, res) => {
  User.find()
    .then(owners => res.json(owners))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;

  const newOwner = new Owner({username});

  newOwner.save()
    .then(() => res.json('Owner added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;