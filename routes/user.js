const router = require('express').Router();
const User = require('../models/user.model');

const bcrypt = require('bcrypt');


// router.route('').get((req, res) => {
//   res.redirect('/home')
// });

router.route('/signup').post( async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10)
  const name = req.body.name;
  const email = req.body.email;
  const password = hashedPassword;
  const newUser = new User({
      name,
      email,
      password
  });
  console.log(newUser)
  newUser.save()
  .then(() => res.json('New user created!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

// Export routes
module.exports = router;