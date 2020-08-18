const express = require('express');
const connectDB = require('./config/db');

const app = express();
// Connect to database
connectDB();

// Init Middleware
app.use(express.json({ extended: false })); // body parser

app.get('/', (req, res) => {
    res.send('API Running...');
});

// Setup express router
app.use('/api/users', require('./routes/users'));
app.use('/api/decks', require('./routes/decks'));
app.use('/api/auth', require('./routes/auth'));

// Heroku environment port or localhost 3000 locally
const PORT = process.env.PORT || 3000;

// Start Server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
