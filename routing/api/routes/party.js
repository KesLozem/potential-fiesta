const express = require('express');
const router = express.Router();

const { getAuthToken } = require('../controllers/party.controller');

router.get('/admin', (req, res) => {
    res.send({ isAdmin: true});
});

router.get('/auth', getAuthToken);

module.exports = router;