const router = require('express').Router();
let Questionary = require('../models/questionary.model');
//let Question = require('../models/questionary.model');
//let Answer = require('../models/questionary.model');

// Get all questionaries
router.route('/').get((req, res) => {
  Questionary.find()
    .then(questionaries => res.json(questionaries))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Add a new questionary
router.route('/add').post((req, res) => {
    const description = req.body.description;

    const newQuestionary = new Questionary({
      description,
    });

    newQuestionary.save()
    .then(() => res.json('Questionary added!'))
    .catch(err => res.status(400).json('Error: ' + err));  
});

// Add a question to a questionary
router.route('/add/:id/question').post((req, res) => {
      Questionary.findById(req.params.id)
      .then(questionary => {
        questionary.questions.push({description: req.body.description});
        
        questionary.save()
        .then(() => res.json('Question added!'))
        .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
});

// Add an answer to a questionary
router.route('/add/:id_questionary/question/:id_question').post((req, res) => {
  Questionary.findById(req.params.id_questionary)
    .then(questionary => {
      const questionById = questionary.questions.id(req.params.id_question);
      questionById.answers.push({description: req.body.description})

      questionary.save()
      .then(() => res.json('Answer added!'))
      .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;