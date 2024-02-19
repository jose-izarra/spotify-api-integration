const express = require('express');
const app = express();
const cors = require('cors');
const bodyparser = require('body-parser');



const login = require('./api/login');
const callback = require('./api/callback');
const newToken = require('./api/newToken');


const allowCrossDomain = (req, res, next) => {
    res.header(`Access-Control-Allow-Origin`, `example.com`);
    res.header(`Access-Control-Allow-Methods`, `GET`);
    res.header(`Access-Control-Allow-Headers`, `Content-Type`);
    next();
}

// app.use(allowCrossDomain);
app.use(cors());
app.options('*', cors());
app.use(bodyparser.json());


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