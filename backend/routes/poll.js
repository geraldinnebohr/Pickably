const router = require('express').Router();
const Poll = require('../models/poll.model');
const Pusher = require('pusher');

var pusher = new Pusher({
    appId: '958478',
    key: '8c2448ad4ff913dfab70',
    secret: '6cd3c066cc15f9257360',
    cluster: 'us2',
    useTLS: true,
});

// ---------- POLL ---------- //

// Get poll info
router.route('/:id').get((req, res) => {
    Poll.findById(req.params.id)
    .then(poll => res.json(poll))
    .catch(err => res.status(400).json('Error: ' + err));    
});

// Create a poll
router.route('/add').post((req, res) => {
    const description = req.body.description;

    const newPoll = new Poll({
        description
    });

    newPoll.save()
    .then(() => res.json('New poll created!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// ---------- OPTIONS ---------- //

// Add an option
router.route('/:id/option/add').post((req, res) => {
    Poll.findById(req.params.id)
    .then(poll => {
        const description = req.body.description;

        poll.options.push({ description: description });
  
        poll.save()
        .then(() => res.json('Option added!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

// Increment option votes
router.route('/:id_poll/option/update/:id_option').put((req, res) => {
    Poll.findById(req.params.id_poll)
        .then(poll => {
            if (!poll) {
            res.status(404).json('Error: Poll not found :(');
            } else {
                const optionById = poll.options.id(req.params.id_option);
                if (!optionById) {
                    res.status(404).json('Error: Option not found :(');
                }
                optionById.votes += 1;
                poll.save()
                .then(() => res.json('Option votes updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
            }
        })
        .catch(err => res.status(400).json('Error: ' + err));
});
  

// ---------- TEST ---------- //

// Pusher test
router.route('/').post((req, res) => {
    pusher.trigger('test-poll', 'test-vote', {
        points: 1,
        option: req.body.option
    });

    return res.json({
        success: true,
        message: 'Thank u for voting'
    });
});


// Export routes
module.exports = router;