const connection = require('../config/connection');
const { User, Thoughts } = require('../models');
const { insertMany } = require('../models/User');
const { getRandomName, getRandomThoughts, getRandomFriend } = require('./data');

connection.on('error', (err) => err);
connection.once('open', async () => {
    console.log('connected');
    await User.deleteMany({});
    await Thoughts.deleteMany({});
    const users = [];
    const allThoughts = [await Thoughts.find()];
    for (let i = 0; i < 20; i++) {
        const thoughts = getRandomThoughts(2);
        const userData = getRandomName();
        users.push({
            userData,
            thoughts,
            friends: [getRandomFriend()],
        });
    }

    await User.collection.insertMany(users);
    await Thoughts.collection(insertMany(allThoughts));
    // loop through the saved applications, for each application we need to generate a application response and insert the application responses
    console.table(users);
    console.info('Users are thinking now....');
    console.info('Seeding complete! 🌱');
    process.exit(0);
});