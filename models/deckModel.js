const mongoose = require('mongoose');

const Deck = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    cards: [
        {
            front: {
                type: String,
                required: true,
            },
            back: {
                type: String,
                required: true,
            },
        },
    ],
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Deck', Deck);
