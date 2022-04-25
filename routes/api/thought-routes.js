
const router = require('express').Router();
const { getAllThoughts, addThought, getThoughtById, updateThought, removeThought, removeReaction, addReaction } = require('../../controllers/thought-controller');

// /api/thoughts
router
    .route('/')
    .get(getAllThoughts)
    .post(addThought);

// /api/thoughts/:thoughtId
router
    .route('/:thoughtId')
    .get(getThoughtById)
    .put(updateThought)
    .delete(removeThought)
    .post(addReaction);

// /api/thoughts/:thoughtId/reactions
router
    .route('/:thoughtId/:reactionId')
    .delete(removeReaction);

module.exports = router;
