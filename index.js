const express = require('express');
const app = express();
const cors = require('cors');
const bodyparser = require('body-parser');



const login = require('./api/login');
const callback = require('./api/callback');
const newToken = require('./api/newToken');

// const cors = require('cors');
// const corsOptions = {
//     origin: ['http://localhost:3000', '*'],
//     optionsSuccessStatus: 200,
//     credentials: true
// }

// // app.use(allowCrossDomain);
// app.use(cors(corsOptions));
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