// var express = require('express');
// var router = express.Router();

// // GOOD IDEA! 
// // In order to handle the authentication redirect, we have one route call for authentication start
// //    - here we need to check that the user isn't already authenticated, which can be done with local storage
// // 
// // Then, if they need to be authenticated, they are spent to spotify, which brings them back
// // to a DIFFERENT route to handle the http response. Then this can store authenticaiton in local storage
// // if it's not already there. 
// //
// //
// // Gameplan: 
// //    1. pkce.js
// //    2. callback.js
// //


// // Code Verifier
// const generateRandomString = (length) => {
//   const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//   const values = crypto.getRandomValues(new Uint8Array(length));
//   return values.reduce((acc, x) => acc + possible[x % possible.length], "");
// }

// const codeVerifier  = generateRandomString(64);

// // Code Challenge

// const sha256 = async (plain) => {
//   const encoder = new TextEncoder()
//   const data = encoder.encode(plain)
//   return window.crypto.subtle.digest('SHA-256', data)
// }

// const base64encode = (input) => {
//   return btoa(String.fromCharCode(...new Uint8Array(input)))
//     .replace(/=/g, '')
//     .replace(/\+/g, '-')
//     .replace(/\//g, '_');
// }

// const hashed = await sha256(codeVerifier)       //we hash the random string htat we generated
// const codeChallenge = base64encode(hashed);     //we encode the hash in base64 to send to spotify to hash match

// const clientId = 'b62589ccee944ef29d7166ae0f00470f';  // spotify developer clientID
// const redirectUri = 'http://localhost:3000';          // where spotify will redirect user after auth (app URI)

// const scope = 'user-read-private user-read-email';                  // what does this scope entail?
// const authUrl = new URL("https://accounts.spotify.com/authorize")   // create a url item to call the http get request

// // Store the codeVerifier in localstorage so it doesn't have to be re-generated
// window.localStorage.setItem('code_verifier', codeVerifier);

// const params =  {
//   response_type: 'code',
//   client_id: clientId,
//   scope,
//   code_challenge_method: 'S256',
//   code_challenge: codeChallenge,
//   redirect_uri: redirectUri,
// } //parameters for the get request

// authUrl.search = new URLSearchParams(params).toString();
// window.location.href = authUrl.toString();

// const urlParams = new URLSearchParams(window.location.search);
// let code = urlParams.get('code');

// const getToken = async code => {

//   // stored in the previous step
//   let codeVerifier = localStorage.getItem('code_verifier');

//   const payload = {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded',
//     },
//     body: new URLSearchParams({
//       client_id: clientId,
//       grant_type: 'authorization_code',
//       code,
//       redirect_uri: redirectUri,
//       code_verifier: codeVerifier,
//     }),
//   }

//   const body = await fetch(url, payload);
//   const response = await body.json();

//   localStorage.setItem('access_token', response.access_token);
// }

// //
// //
// //
// //
// //
// //
// //
// //
// /* GET users listing. */
// router.get('/auth', function(req, res, next) {
//   res.render('/auth', { title: 'This is the title',
//                         auth_key: getToken(code)   });
// });

// module.exports = router;
