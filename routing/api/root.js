const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../utils')

// authentication
const { initializePassport } = require('./spotify-passport-config');
const passport = require('passport');
initializePassport(passport);

router.use(passport.initialize());
router.use(passport.session());

const authRoutes = require('./routes/auth');
const playerRoutes = require('./routes/player');
const partyRoutes = require('./routes/party');
const playlistRoutes = require('./routes/playlist');

router.use('/auth', authRoutes);
router.use('/player', playerRoutes);
//router.use('/party', isAuthenticated, partyRoutes);
router.use('/party', partyRoutes);
router.use('/playlist', playlistRoutes);
module.exports = router;