const router = require('express').Router();

const Room = require('../models/room.model');

// ---------- ROOM ---------- //

// Get room info
router.route('/:id').get((req, res) => {
    Room.findById(req.params.id)
    .then(room => res.json(room))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Add/Create a room
router.route('/add').post((req, res) => {
    const qtryId = req.body.qtryId;

    const newRoom = new Room({
        qtryId
    });

    newRoom.save()
    .then(() => res.json('New room created! -> ' + newRoom._id))
    .catch(err => res.status(400).json('Error: ' + err));
})

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

// Update player score
router.route('/:id_room/player/update/:id_player').put((req, res) => {
    Room.findById(req.params.id_room)
      .then(room => {
        if (!room) {
          res.status(404).json('Error: Room not found :(');
        } else {
          const playerById = room.players.id(req.params.id_player);
          if (!playerById) {
            res.status(404).json('Error: Player not found :(');
          }
          playerById.score = req.body.score;
          room.save()
            .then(() => res.json('Player score updated!'))
            .catch(err => res.status(400).json('Error: ' + err));
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

// Export routes
module.exports = router;