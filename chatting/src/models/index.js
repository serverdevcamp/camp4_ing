const mongoose = require('mongoose');

mongoose.connect(
    `mongodb://chatAdmin:inging123!@localhost:27017/chatting`,
    {
        useNewUrlParser: true,
        useUnifiedTopology : true
    });

const db = mongoose.connection;
db.on('error', () => {
    console.log('Mongoose : Connection Failed');
});

db.once('open', () => {
    console.log('Mongoose : Connected!');
});

module.exports = db;