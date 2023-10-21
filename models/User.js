const { Schema, model } = require('mongoose');
const thoughtsSchema = require('./Thoughts');
const friendsSchema = require('./Friends');

// Schema to create Student model
const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            validate: {
                validator: function (e) {
                    return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(e);
                },
                message: "Please enter a valid email"
            },
            required: [true, "Email required"]
        },
        thoughts: [thoughtsSchema],
        friends: [friendsSchema],
    },
    {
        toJSON: {
            getters: true,
            virtuals: true
        },
    }
);

userSchema.virtual('friendCount').get(function () {
    return `This user has this many friends: ${this.friends.length}!`;
});


const User = model('user', userSchema);

module.exports = User;