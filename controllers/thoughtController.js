const { Reaction, Thoughts } = require('../models');

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
    // CREATE A THOUGHT
    createThought(req, res) {
        Thoughts.create(req.body)
            .then((thought) => res.json({ thought, message: 'Nice thought. Philosopher vibes over here' }))
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
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
    updateThought(req, res) {
        Thoughts.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'Could not find that thought. Think again ;)' })
                    : res.json(course)
            )
            .catch((err) => res.status(500).json(err));
    },
}