const router = require('express').Router();
const Questionary = require('../models/questionary.model');
const Room = require('../models/room.model');

// ---------- ROOM ---------- //

// Get room info
router.route('/:id').get((req, res) => {
  Room.findById(req.params.id)
  .then(room => res.json(room))
  .catch(err => res.status(400).json('Error: ' + err));
});

// Get players sorted by score
router.route('/:id/ranking').get((req, res) => {
  Room.findById(req.params.id)
  .then(room => {
    const pList = room.players
    const sList = pList.sort((a, b) => (a.score < b.score) ? 1 : -1)
    //console.log(sList)
    res.json(sList);
  })
  .catch(err => res.status(400).json('Error: ' + err));
});

// Add/Create a room
router.route('/new/:qtry_id').post((req, res) => {
  Questionary.findById(req.params.qtry_id)
    .then(questionary => {
      const newRoom = new Room({
          questionary
      });
      newRoom.save()
      .then(() => res.json(newRoom._id))
      .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

// ---------- PLAYER ---------- //

// Add a player
router.route('/:id/player/add').post((req, res) => {
    Room.findById(req.params.id)
      .then(room => {
        const nm = req.body.userName;
        const playerName = room.players.find(p => p.userName === nm);
        if (!playerName) {
            room.players.push({ userName: req.body.userName });
  
            room.save()
            .then(() => res.json('Player added!'))
            .catch(err => res.status(400).json('Error: ' + err));
        }
        else {
            res.json('User name already used -_-')
        }
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });


// Delete room
router.route('/del/:id').delete((req, res) => {
  Room.findByIdAndDelete(req.params.id)
    .then(() => res.json('Room deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Update player score
router.route('/:id_room/question/:q_index/answer/:a_index/player/:name').put((req, res) => {
  Room.findById(req.params.id_room)
    .then(room => {

      const q_i = req.params.q_index;
      const a_i = req.params.a_index;

      const playerByName = room.players.find(n => n.userName == req.params.name);

      console.log('q_i: ' + q_i + '| a_i: ' + a_i + '| player: ' + playerByName)
      if (!playerByName) {
        res.status(404).json('Error: Player not found :(');
      }
      //playerByName.score += parseInt(req.body.increment);
      
      if (room.questionary.questions[q_i].answers[a_i].value) {
        playerByName.score += 5;
      }
          
      room.questionary.questions[q_i].answers[a_i].votes += 1;

      room.save()
        .then(() => res.json('Player score updated, and answer votes too'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

// ---------- QUESTIONARY ---------- //

// Increment room votes
router.route('/:id_room/question/:q_index/answer/:a_index').put((req, res) => {
  Room.findById(req.params.id_room)
      .then(room => {
          const q_i = req.params.q_index;
          const a_i = req.params.a_index;
          
          room.questionary.questions[q_i].answers[a_i].votes += 1;
          room.save()
          .then(() => res.json('Answer votes updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
});

// Get question by index
router.route('/:id_room/question/:index').get((req, res) => {
  Room.findById(req.params.id_room)
    .then(room => res.json(room.questionary.questions[req.params.index]))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Export routes
module.exports = router;