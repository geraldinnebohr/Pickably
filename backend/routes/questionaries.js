const router = require('express').Router();
const Questionary = require('../models/questionary.model');


// ---------- QUESTIONARY ---------- //

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
    description
  });

  newQuestionary.save()
  .then(() => res.json('Questionary added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

// Update questionary description
router.route('/update/:id').put((req, res) => {
  Questionary.findById(req.params.id)
    .then(questionary => {
      if (!questionary) {
        res.status(404).json('Error: Questionary not found :(');
      } else {
        questionary.description = req.body.description;

        questionary.save()
          .then(() => res.json('Questionary description updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      }
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

// Delete questionary
router.route('/del/:id').delete((req, res) => {
  Questionary.findByIdAndDelete(req.params.id)
    .then(() => res.json('Questionary deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});


// ---------- QUESTION ---------- //

// Get questions by questionary ID
router.route('/:id/questions').get((req, res) => {
  Questionary.findById(req.params.id)
    .then(questionary => res.json(questionary.questions))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Add a question to a questionary
router.route('/:id/question/add').post((req, res) => {
  Questionary.findById(req.params.id)
    .then(questionary => {
      questionary.questions.push({ description: req.body.description });

      questionary.save()
        .then(() => res.json('Question added!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

// Update question description
router.route('/:id_questionary/question/update/:id_question').put((req, res) => {
  Questionary.findById(req.params.id_questionary)
    .then(questionary => {
      if (!questionary) {
        res.status(404).json('Error: Questionary not found :(');
      } else {
        const questionById = questionary.questions.id(req.params.id_question);
        if (!questionById) {
          res.status(404).json('Error: Question not found :(');
        }
        questionById.description = req.body.description;
        questionary.save()
          .then(() => res.json('Question description updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      }
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

// Delete question
router.route('/:id_questionary/question/del/:id_question').delete((req, res) => {
  Questionary.findById(req.params.id_questionary)
    .then(questionary => {
      if (!questionary) {
        res.status(404).json('Error: Questionary not found :(');
      } else {
        questionary.questions.id(req.params.id_question).remove();
        questionary.save()
          .then(() => res.json('Question deleted!'))
          .catch(err => res.status(400).json('Error: ' + err));
      }
    })
    .catch(err => res.status(400).json('Error: ' + err));
});


// ---------- ANSWER ---------- //

// Get answers by question Id and questionary Id
router.route('/:id_questionary/question/:id_question/answers').get((req, res) => {
  Questionary.findById(req.params.id_questionary)
    .then(questionary => {
      const questionById = questionary.questions.id(req.params.id_question);
      res.json(questionById);
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

// Add an answer to a question
router.route('/:id_questionary/question/:id_question/answer/add').post((req, res) => {
  Questionary.findById(req.params.id_questionary)
    .then(questionary => {
      const questionById = questionary.questions.id(req.params.id_question);
      questionById.answers.push({ description: req.body.description });

      questionary.save()
        .then(() => res.json('Answer added!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

// Update answer description and value
router.route('/:id_questionary/question/:id_question/answer/update/:id_answer').put((req, res) => {
  Questionary.findById(req.params.id_questionary)
    .then(questionary => {
      if (!questionary) {
        res.status(404).json('Error: Questionary not found :(');
      } else {
        const questionById = questionary.questions.id(req.params.id_question);
        if (!questionById) {
          res.status(404).json('Error: Question not found :(');
        } else {
          const answerById = questionById.answers.id(req.params.id_answer);
          if (!answerById) {
            res.status(404).json('Error: Answer not found :(');
          } else {
            if (req.body.description) {
              answerById.description = req.body.description;
            }
            else {
              answerById.description = answerById.description;
            }
            answerById.value = req.body.value;

            questionary.save()
              .then(() => res.json('Answer description updated!'))
              .catch(err => res.status(400).json('Error: ' + err));
          }
        }
      }
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

// Delete answer
router.route('/:id_questionary/question/:id_question/answer/del/:id_answer').delete((req, res) => {
  Questionary.findById(req.params.id_questionary)
    .then(questionary => {
      if (!questionary) {
        res.status(404).json('Error: Questionary not found :(');
      } else {
        const questionById = questionary.questions.id(req.params.id_question);
        if (!questionById) {
          res.status(404).json('Error: Question not found :(');
        } else {
          questionById.answers.id(req.params.id_answer).remove();
          questionary.save()
            .then(() => res.json('Answer deleted!'))
            .catch(err => res.status(400).json('Error: ' + err));
        }
      }
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

// Export routes
module.exports = router;
