const username = [
    'ChefMonica',
    'RachelLovesCoffee',
    'PhoebeBananaHammock',
    'ChanandlerBong',
    'DinosaurRulesRoss',
    'JoeyDOOL',
];

const thoughts = [
    'This is nice',
    'This is okay',
    'I think this is fine',
    'I believe this is good',
    'Hmm.. Maybe?',
    'I think it will not good',
    'Today is a good day to relax.',
    'This is a beautiful place.',
    'I love this product.',
    'The weather today is amazing!',
    'I had a great day.',
    'I wish I could travel more.',
];

const reactions = [
    'nice',
    'i agree',
    'i might not agree',
    '*thumbs up*',
    'you might be correct',
    'nah',
    'That sounds awesome.',
    'I feel the same way.',
    'You have a great taste!',
];

const users = [];

// Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Gets a name
const getRandomName = () =>
    `${getRandomArrItem(username)}`;

// Function to generate random thouhts that we can add to the database. Includes reactions
const getRandomThoughts = (int) => {
    let results = [];
    for (let i = 0; i < int; i++) {
        results.push({
            thoughtText: getRandomArrItem(thoughts),
            username: getRandomArrItem(username),
            reactions: [...getReactions(2)],
        });
    }
    return results;
};

// Create the reactions that will be added to each thought
const getReactions = (int) => {
    if (int === 1) {
        return getRandomArrItem(reactions);
    }
    const results = [];
    for (let i = 0; i < int; i++) {
        results.push({
            reactionBody: getRandomArrItem(reactionss),
            username: getRandomName(),
        });
    }
    return results;
};


// Export the functions for use in seed.js
module.exports = { getRandomName, getRandomThoughts };