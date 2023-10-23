const connection = require('../config/connection');
const { User, Thoughts } = require('../models');
const { getRandomName, getRandomThoughts } = require('./data');

connection.on('error', (err) => err);
connection.once('open', async () => {
    console.log('connected');
    await Application.deleteMany({});
    await User.deleteMany({});

    const users = [];
    const thoughts = getRandomThoughts(10);

    for (let i = 0; i < 20; i++) {
        const fullname = getRandomName();
        users.push({
            first,
            last,
            age: Math.floor(Math.random() * (99 - 18 + 1) + 18),
        });
    }

    await User.collection.insertMany(users);
    await Thoughts.collection.insertMany(thoughts);

    // loop through the saved applications, for each application we need to generate a application response and insert the application responses
    console.table(users);
    console.table(applications);
    console.info('Seeding complete! 🌱');
    process.exit(0);
});