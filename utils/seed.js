const connection = require('../config/connection');
const { User, Thoughts } = require('../models');
const { getRandomName, getRandomThoughts, getRandomFriend } = require('./data');

connection.on('error', (err) => err);
connection.once('open', async () => {
    console.log('connected');
    await Thoughts.deleteMany({});
    await User.deleteMany({});

    const users = [];
    const thoughts = getRandomThoughts(2);

    for (let i = 0; i < 5; i++) {
        const userData = getRandomName();
        users.push({
            ...userData,
            thoughts,
            friends: [getRandomFriend()],
        });
    }

    await User.collection.insertMany(users);
    await Thoughts.collection.insertMany(thoughts);

    // loop through the saved applications, for each application we need to generate a application response and insert the application responses
    console.table(users);
    console.table(thoughts);
    console.info('Seeding complete! 🌱');
    process.exit(0);
});