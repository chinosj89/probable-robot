// GET ALL USERS
// GET A SINGLE USER - Populate thought and friend data
// POST A NEW USER
// PUT = UPDATE USER
// DELETE USER
// POST = Add new friend to USER
// DELETE a friend from user's friend list
const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    deleteUser,
    addThought,
    deleteThought,
} = require('../../controllers/userController');

// api/users
router.route('/').get(getUsers).post(createUser);
// api/users/:userId
router.route('/:userId').get(getSingleUser).delete(deleteUser);
// api/users/:userId/thoughts
router.route('/:userId/thoughts').post(addThought);
// api/user/:userId/thoughts/:thoughtId
router.route('/:userId/thoughts/:thoughtId').delete(deleteThought);

module.exports = router;