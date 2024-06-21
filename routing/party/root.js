// ROUTE: .../party/*

const express = require('express');
const router = express.Router();
const { isAuthorized } = require('../utils')

// authentication
const { initializePassport } = require('../api/spotify-passport-config');
const passport = require('passport');
initializePassport(passport);

router.use(passport.initialize());
router.use(passport.session());

router.use('*', isAuthorized);

module.exports = router;