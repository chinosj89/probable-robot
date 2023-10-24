const { Reaction, Thoughts, User } = require('../models');

module.exports = {
    // GET ALL THOUGHTS
    getThoughts(req, res) {
        Thoughts.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err))
    },
    // GET SINGLE THOUGHT
    getSingleThought(req, res) {
        Thoughts.findOne({ _id: req.params.thoughtId })
            .select('-__v')
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'Could not find that thought. Think again ;)' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    addThought(req, res) {
        Thoughts.create(req.body)
            .then((thought) =>
                User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $addToSet: { thoughts: thought._id } },
                    { runValidators: true, new: true }
                ))
            .then((user) =>
                !user
                    ? res
                        .status(404)
                        .json({ message: 'No user found with that ID. Nice thought though :)' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    // UPDATE A THOUGHT WILL YA?
    // Reactions included
    updateThought(req, res) {
        Thoughts.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((thought) => {
                if (!thought) {
                    return res.status(404).json({ message: 'Could not find that thought. Think again ;)' });
                }
                res.json({ message: 'Did ya fix your thoughts?' });
            })
            .catch((err) => res.status(500).json(err));
    },


    // DELETE A THOUGHT
    deleteThought(req, res) {
        Thoughts.findOneAndRemove({ _id: req.params.thoughtId })
            .then((thought) => {
                return !thought
                    ? res.status(404).json({ message: 'Could not find that thought. Think again ;)' })
                    : User.findOneAndUpdate(
                        { _id: req.params.userId },
                        { $pull: { thoughts: req.params.thoughtId } }
                    );
            })
            .then(() => res.json({ message: 'Thought deleted!' }))
            .catch((err) => res.status(500).json(err));
    },



    addReaction(req, res) {
        Thoughts.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        )
            .then((thought) => {
                !thought
                    ? res.status(404).json({ message: 'Could not find that thought. Think again ;)' })
                    : res.json({ message: 'Well you reacted quite well!' });
            })
            .catch((err) => res.status(500).json(err));
    },
    // DELETE REACTION ONLY
    deleteReaction(req, res) {
        Thoughts.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true }
        )
            .then((reaction) => {
                !reaction
                    ? res.status(404).json({ message: 'No reaction found with that ID' })
                    : res.json({ message: 'Reactions deleted!' });
            })
            .catch((err) => res.status(500).json(err));
    },



}