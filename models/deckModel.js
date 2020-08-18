const mongoose = require('mongoose');

const Deck = new mongoose.Schema({
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
});

module.exports = mongoose.model('Deck', Deck);
