const router = require('express').Router();
const {
    getThoughts,
    getSingleThought,
    createThought,
    deleteThought,
    updateThought,
    deleteReaction,
} = require('../../controllers/thoughtController');

router.route('/').get(getThoughts).post(createThought);

// api/thought/:thoughtId
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought)
// api/thought/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction)

module.exports = router;