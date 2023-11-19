const router = require('express').Router();
// importing functions globally to be used locally as defined in routes below
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  postReactionToThoughtId,
  deleteReaction,
} = require('../../controllers/thoughtController.js');

// /api/thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:thoughtId
router
  .route('/:thoughtId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

  // /api/thoughts/:thoughtId/reactions
  // POST to create a reaction stored in a single thought's reactions array field                                    
router.route('/:thoughtId/reactions')
  .post(postReactionToThoughtId);

// DELETE to pull and remove a reaction by the reaction's reactionId value
router.route('/:thoughtId/reactions/:reactionId')
  .delete(deleteReaction);


module.exports = router;
