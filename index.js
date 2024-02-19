const express = require('express');
const app = express();
const cors = require('cors');

const login = require('./api/login');
const callback = require('./api/callback');
const newToken = require('./api/newToken');


app.use(cors())
// app.use(express.json({ extended: false }));

app.use('/api/login', login);
app.use('/api/callback', callback);
app.use('/api/newToken', newToken);

app.get('/', (req, res) => {
    res.send('<h1>Log in at /api/login</h1>');

})

const port = 8888;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});