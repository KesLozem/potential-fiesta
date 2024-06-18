const express = require('express');
const router = express.Router();

const { getUsername, getAdminName } = require('../controllers/profile.controller');

router.get('/', getUsername);
router.get('/admin', getAdminName)

module.exports = router;