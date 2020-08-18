const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('API Running...');
});

//Heroku environment port or localhost 3000 locally
const PORT = process.env.PORT || 3000;

//Start Server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
