const mongoose = require('mongoose');

const User = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    decks: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Deck',
    },
});

module.exports = mongoose.model('User', User);
