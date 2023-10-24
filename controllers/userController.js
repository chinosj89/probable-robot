const { Thoughts, User } = require('../models');
// Aggregate function to get the number of users overall
const userCount = async () => User.aggregate()
    .count('userCount')
    .then((numberOfUsers) => numberOfUsers);


module.exports = {
    // GET ALL USERS
    getUsers(req, res) {
        User.find()
            .then(async (users) => {
                const userObj = {
                    users,
                    userCount: await userCount(),
                };
                return res.json(userObj);
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    // GET A SINGLE USER
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .select('-__v')
            .then(async (user) =>
                !user
                    ? res.status(404).json({ message: 'No user with that ID' })
                    : res.json({ user }))
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            })
    },
    // CREATE A NEW USER
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((user) => {
                if (!user) {
                    return res.status(404).json({ message: 'Could not find that user' });
                }
                res.json(user);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // DELETE AND REMOVER USER
    deleteUser(req, res) {
        User.findOneAndRemove({ _id: req.params.userId })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No such user exists' })
                    : Thoughts.findOneAndUpdate(
                        { user: req.params.userId },
                        { $pull: { user: req.params.userId } },
                        { new: true }
                    )
            )
            .then((thoughts) =>
                !thoughts
                    ? res.status(404).json({
                        message: 'User deleted, but none of their thoughts were found',
                    })
                    : res.json({ message: 'User successfully deleted' })
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        )
            .then((user) =>
                user
                    ? res.json(user)
                    : res.status(404).json({ message: 'No user found with that ID' })
            )
            .catch((err) => res.status(500).json(err));
    },
    deleteFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        )
            .then((user) =>
                user
                    ? res.json(user)
                    : res.status(404).json({ message: 'No user with this id!' })
            )
            .catch((err) => res.status(500).json(err));
    },


}