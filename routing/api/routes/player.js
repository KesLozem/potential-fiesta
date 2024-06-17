const express = require('express');
const router = express.Router();

const { 
    getOnlineStatus,
    putTransferDevice
 } = require('../controllers/player.controller');

router.get('/online', getOnlineStatus);
router.put('/device', putTransferDevice)
module.exports = router;