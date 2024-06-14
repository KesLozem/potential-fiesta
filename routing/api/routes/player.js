const express = require('express');
const router = express.Router();

const { 
    getOnlineStatus,
    getAuthToken
 } = require('../controllers/player.controller');

router.get('/online', getOnlineStatus);

module.exports = router;