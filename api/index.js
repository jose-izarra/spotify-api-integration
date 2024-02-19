const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
require('dotenv').config();


// environment variables
const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;



const scopes = 'user-read-currently-playing user-read-recently-played';
// url declarations
const generateTokenURL = `https://accounts.spotify.com/api/token`;
const nowPlayingURL = `https://api.spotify.com/v1/me/player/currently-playing?additional_types=episode,track`;
const recentlyPlayedURL = `https://api.spotify.com/v1/me/player/recently-played?limit=3`;
const userInfoURl = `https://api.spotify.com/v1/me`;
const loginURL = `https://accounts.spotify.com/authorize?client_id=${SPOTIFY_CLIENT_ID}&response_type=code&scope=${scopes}&redirect_uri=${SPOTIFY_REDIRECT_URI}`



app.get('/api/v1/login', (req, res) => {
    res.redirect(loginURL);
})



app.get('/api/v1/callback', (req, res) => {
    const code = req.query.code || null;

    if (code === null) {
        res.redirect('/#/error/invalid code');
    }

    const authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
          code: code,
          redirect_uri: redirect_uri,
          grant_type: 'authorization_code'
        },
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          Authorization: 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
        },
        json: true
      };
      
      request.post(authOptions, function(error, response, body) {
        if (!error && response.statusCode === 200) {
  
          var access_token = body.access_token,
              refresh_token = body.refresh_token;
  
          var options = {
            url: 'https://api.spotify.com/v1/me/player/currently-playing?market=ES&additional_types=track',
            headers: { 'Authorization': 'Bearer ' + access_token },
            json: true
          };
  
          // use the access token to access the Spotify Web API
          request.get(options, function(error, response, body) {
            console.log(body);
          });
  
          // we can also pass the token to the browser to make requests from there
          res.redirect('/#' +
            querystring.stringify({
              access_token: access_token,
              refresh_token: refresh_token
            }));
        } else {
          res.redirect('/#' +
            querystring.stringify({
              error: 'invalid_token'
            }));
        }
      });

})


app.get('/api/v1/refresh_token', (req, res) => {
    const refresh_token = req.query.refresh_token;

    const authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        headers: { 
          'content-type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64')) 
        },
        form: {
          grant_type: 'refresh_token',
          refresh_token: refresh_token
        },
        json: true
    };

    request.post(authOptions, function(error, response, body) {
        if (!error && response.statusCode === 200) {
          var access_token = body.access_token,
              refresh_token = body.refresh_token;
          res.send({
            'access_token': access_token,
            'refresh_token': refresh_token
          });
        }
      });
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})



module.exports = app;