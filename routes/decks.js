const express = require('express');
const router = express.Router();

// @route GET /decks
// @desc Test Route
// @access Public
router.get('/', (req, res) => {
    res.send('Decks Route');
});

module.exports = router;
