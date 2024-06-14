const express = require('express');
const session = require('express-session');
const router = express.Router();
const passport = require('passport');
const { clearAccessToken } = require('../services/credentials.db');

router.get(
    '/login', express.urlencoded({ extended: false }),
    passport.authenticate('spotify', {
        scope: [
            'user-read-email', 
            'user-read-private',
            'user-read-playback-state',
            'playlist-read-private',
            'playlist-modify-private',
            'playlist-modify-public',
            'user-modify-playback-state',
            'streaming',
        ],
        showDialog: true,
    })
);

router.get(
    '/callback',
    passport.authenticate('spotify', { failureRedirect: '/login' }),
    function (req, res, next) {
        req.session.regenerate(function (err) {
            if (err) next(err)
            req.session.save(function (err) {
                if (err) next(err)
                req.login(req.user, function (err) {
                    if (err) {
                        return next(err);
                    }
                });
            })
        })
        res.redirect('/party');
    },
);

router.get('/logout', function (req, res, next) {

    clearAccessToken();
    req.session.username = null;
    req.session.save(function (err) {
        if (err) next(err)
        req.session.regenerate(function (err) {
            if (err) next(err)
            req.logout(
                function (err) {
                    if (err) next(err)
                    res.redirect('/')
                }
            );
        })
    })
});

module.exports = router;