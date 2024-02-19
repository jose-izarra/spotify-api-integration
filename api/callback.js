const callback = require('express').Router();
const querystring = require('querystring');
const request = require('request');



require('dotenv').config();


const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const redirect_uri = process.env.SPOTIFY_REDIRECT_URI;

console.log(redirect_uri);

const stateKey = 'spotify_auth_state';

callback.get('/', (req, res) => {

    const code = req.query.code || null;
    const state = req.query.state || null;
    const storedState = req.cookies ? req.cookies[stateKey] : null;

    // if (state === null || state !== storedState) {
    //     res.redirect('/#' +
    //       querystring.stringify({
    //         error: 'state_mismatch'
    //       }));
    //   } else {

    if (code) {
    res.clearCookie(stateKey);

    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64'))
      },
      json: true
    };

    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {

        var access_token = body.access_token, refresh_token = body.refresh_token;

        var options = {
          url: 'https://api.spotify.com/v1/me/player/currently-playing?market=ES&additional_types=track',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
        };

        // use the access token to access the Spotify Web API
        request.get(options, function(error, response, body) {
          console.log(body);
          //res.set('Content-Type', 'application/json');
          res.set('Access-Control-Allow-Origin', '*')
          if (body) {
            res.status(200).json({ 
              name: body.item.name, 
              artist: body.item.artists[0].name, 
              album: body.item.album.name, 
              image: body.item.album.images[0].url
            });
          } else {
            res.status(200).json({ name: '', artist: '', album: '', image: ''})
          }

        });

        
      } else {
        res.redirect('/#' +
          querystring.stringify({
            error: 'invalid_token'
          }));
      }
    });
    }

});




module.exports = callback;
