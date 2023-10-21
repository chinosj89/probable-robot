const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

const thoughtsSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        username: {
            type: String,
            required: true
        },
        reaction: [reactionSchema],
    },
    {
        timestamps: true,
        toJSON: {
            getters: true,
            virtuals: true
        },
    }
);

thoughtsSchema.virtual('reactionCount').get(function () {
    return `This user reacts this many times ${this.reaction.length}! You think that's too many?`
});

const Thoughts = model('thoughts', thoughtsSchema);

module.exports = Thoughts;