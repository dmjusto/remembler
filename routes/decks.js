const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');
const Deck = require('../models/deckModel');
const User = require('../models/userModel');
const { findOneAndUpdate, findById } = require('../models/userModel');

// GET /decks
// Get all decks
// Public
router.get('/', async (req, res) => {
    const allDecks = await Deck.find({});
    res.json(allDecks);
});

// Post /
// Creates a new deck
// Private
router.post(
    '/',
    [auth, [check('name', 'Deck name is required').notEmpty()]],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const { name } = req.body;
            const user = await User.findById(req.user.id).select('-password');
            const newDeck = new Deck({
                name,
            });
            newDeck.save();

            // Add a reference to the new deck to the User model
            user.decks.unshift(newDeck.id);
            user.save();

            res.json(newDeck);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// Delete /:id
// Destroy a deck
// Private
router.delete('/:id', [auth], async (req, res) => {
    try {
        const deckToRemove = await Deck.findById(req.params.id);
        if (!deckToRemove) {
            return res.status(404).send('Deck not found');
        }

        // Remove deck reference from User
        const user = await User.findById(req.user.id).select('-password');
        const removeIndex = user.decks.indexOf(req.params.id);
        user.decks.splice(removeIndex, 1);
        user.save();

        // Remove Deck from database
        await Deck.findOneAndRemove({ _id: req.params.id });

        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Put /:id
// Add or Remove card from deck
// Private
router.put(
    '/:id',
    [auth, check('cards', 'Content is required on both sides').notEmpty()],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const cards = req.body.cards;
            const deck = await Deck.findById(req.params.id);
            if (!deck) {
                return res.status(404).send('Deck not found');
            }

            // Update Deck with new card data
            await deck.updateOne({ cards: cards });

            res.send('deck updated');
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

module.exports = router;
