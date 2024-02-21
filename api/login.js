const login = require('express').Router();
const querystring = require('querystring');
const cors = require('cors');
require('dotenv').config();



const corsOptions = {
    origin: '*',
}


login.use(cors(corsOptions));

const client_id = process.env.SPOTIFY_CLIENT_ID; 
const redirect_uri = process.env.SPOTIFY_REDIRECT_URI; //
console.log(redirect_uri);


const generateRandomString = (length) => {
    return require('crypto')
    .randomBytes(60)
    .toString('hex')
    .slice(0, length);
  }


const stateKey = 'spotify_auth_state';


login.post("/", (req, res) => {
    const state = generateRandomString(16);

    res.cookie(stateKey, state);

    // your application requests authorization
    const scope = 'user-read-private user-read-email user-read-currently-playing';
    res.redirect('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
        response_type: 'code',
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state
    }));
});



module.exports = login;