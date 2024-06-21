const express = require('express');
const router = express.Router();

const { 
    getOnlineStatus,
    putTransferDevice,
    get_Queue
 } = require('../controllers/player.controller');

router.get('/online', getOnlineStatus);
router.put('/device', putTransferDevice);
router.get('/queue', get_Queue);
module.exports = router;