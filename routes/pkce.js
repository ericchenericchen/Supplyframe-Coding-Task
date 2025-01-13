// Code for PKCE OAuth taken from Spotify API documentation
var express = require('express');
var crypto = require('crypto');

var router = express.Router();

// Random Seed helper
const generateRandomString = (length) => {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const values = crypto.getRandomValues(new Uint8Array(length));
    return values.reduce((acc, x) => acc + possible[x % possible.length], "");
}

// Encrypt helper
const sha256 = async (plain) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(plain);
    return crypto.createHash('sha256').update(data).digest('hex');
}

// Encode helper
const base64encode = (input) => {
return btoa(String.fromCharCode(...new Uint8Array(input)))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

// Create url for authentication request
const authUrlGenerator = async () => {
    console.log()
    const codeVerifier  = generateRandomString(64);

    // // Store the codeVerifier
    // req.session.codeVerifier = codeVerifier;

    // Set Code Challenge
    const hashed = await sha256(codeVerifier);
    const codeChallenge = base64encode(hashed);

    const clientId = 'b62589ccee944ef29d7166ae0f00470f';        // spotify developer clientID
    const redirectUri = 'http://localhost:3000/callback';       // redirect after OAuth (/callback route)

    const scope = 'user-read-private user-read-email';
    const authUrl = new URL("https://accounts.spotify.com/authorize");
    
    // Query String for PKCE authentication
    const params =  {
        response_type: 'code',
        client_id: clientId,
        scope,
        code_challenge_method: 'S256',
        code_challenge: codeChallenge,
        redirect_uri: redirectUri,
    }
    // Add Query String to URL
    authUrl.search = new URLSearchParams(params).toString();

    return authUrl;
}

/* GET authentication from Spotify. */
router.get('/', async function(req, res, next) {
    console.log('we out here');
    try{
        authUrl = await authUrlGenerator();
    }
    catch(error){
        console.log(error);
        throw error;
    }
    res.redirect(authUrl+"&show_dialog=true");
});

module.exports = router;
