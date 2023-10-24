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
            .select('-__v', 'reactionCount', 'updatedAt')
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
                    { _id: req.params.userId },
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
    // DELETE A THOUGHT
    deleteThought(req, res) {
        Thoughts.findOneAndDelete({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'Could not find that thought. Think again ;)' })
                    : Reaction.deleteMany({ _id: { $in: thought.reactions } })
            )
            .then(() => res.json({ message: 'Thoughts and reactions were deleted :(' }))
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
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'Could not find that thought. Think again ;)' })
                    : Reaction.create(req.body)
                        .then(() => res.json({ message: 'Reaction added!' })))
            .catch((err) => res.status(500).json(err));
    },
    // DELETE REACTION ONLY
    deleteReaction(req, res) {
        Reaction.findOneAndDelete({ _id: req.params.reactionId })
            .then((reaction) => {
                if (!reaction) {
                    return res.status(404).json({ message: 'No reaction found with that ID' });
                }
                res.json({ message: 'Reactions deleted!' });
            })
            .catch((err) => res.status(500).json(err));
    }


}