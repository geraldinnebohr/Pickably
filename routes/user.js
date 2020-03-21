const router = require('express').Router();
const User = require('../models/user.model');

const bcrypt = require('bcrypt');


router.route('').get((req, res) => {
  res.redirect('/home')
});

router.route('/signup').post( async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password,10)
  const user = req.body.user;
  const email = req.body.email;
  const password = hashedPassword;
  const newUser = new User({
      user,
      email,
      password
  });
  newUser.save()
  .then(() => res.redirect('/login'))
  .catch(() => res.redirect('/signup'));
  console.log(newUser)
});

// Export routes
module.exports = router;