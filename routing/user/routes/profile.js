const express = require('express');
const router = express.Router();

const { getUsername } = require('../controllers/profile.controller');

router.get('/', getUsername);

module.exports = router;