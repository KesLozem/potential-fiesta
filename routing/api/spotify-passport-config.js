// Passport will use this strategy to authenticate users with Spotify.
// Auth will also be used to send requests to spotify api.

const { setAccessToken, setRefreshToken } = require('./services/credentials.db');

const SpotifyStrategy = require('passport-spotify').Strategy;

const spotifyStrategy = new SpotifyStrategy(
    {
        clientID: process.env.SPOTIFY_CLIENT_ID,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
        callbackURL: process.env.REDIRECT_URI,
    },
    (accessToken, refreshToken, profile, done) => {
        process.nextTick(function () {
            console.log("TOKEN", accessToken, "PROFILE", profile)
            setAccessToken(accessToken);
            setRefreshToken(refreshToken);
            return done(null, profile);
        });
    },
);

function initializePassport(passport) {

    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (obj, done) {
        done(null, obj);
    });

    passport.use(spotifyStrategy);

};

module.exports = { initializePassport, spotifyStrategy }