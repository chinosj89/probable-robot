const router = require('express').Router();
const {
    getThoughts,
    getSingleThought,
    addThought,
    deleteThought,
    updateThought,
    deleteReaction,
} = require('../../controllers/thoughtController');
// api/thoughts
router.route('/').get(getThoughts)
// api/thoughts/:userId
router.route('/:userId').post(addThought)
// api/thoughts/:thoughtId
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought)
// api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction)

module.exports = router;