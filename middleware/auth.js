const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
    const token = req.header('x-auth-token');

    if (!token) {
        return res.status(401).json({ msg: 'No Token, authorization dendied' });
    }

    try {
        // Verify Token
        const decoded = jwt.verify(token, config.get('jwtSecret'));

        req.user = decoded.user;

        next();
    } catch (err) {
        res.status(401).send('Token not valid');
    }
};
