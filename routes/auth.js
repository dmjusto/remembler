const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/userModel');
const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');

// @route GET api/auth
// @desc Test Route
// @access Private
router.get('/', auth, async (req, res) => {
    try {
        const user = await await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route Post /api/auth
// @desc Authenticate User and get Token
// @access Public
router.post(
    '/',
    // Input Validation
    [
        check('email', 'Valid email is required').isEmail(),
        check('password', 'Password is required').exists(),
    ],
    async (req, res) => {
        // Check for Errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            // Make sure user is registered
            let user = await User.findOne({ email });
            if (!user) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: 'Invalid Credentials' }] });
            }

            // Make sure password is correct
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: 'Invalid Credentials' }] });
            }

            // Return json webtoken
            const payload = {
                user: {
                    id: user.id,
                },
            };

            jwt.sign(
                payload,
                config.get('jwtSecret'),
                { expiresIn: 360000 },
                (err, token) => {
                    if (err) throw err;

                    res.json({ token });
                }
            );
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

module.exports = router;
