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

router.use('/auth', authRoutes);
router.use('/player', playerRoutes);
router.use('/party', partyRoutes);
module.exports = router;