const express = require('express');
const router = express.Router();

const { 
    getOnlineStatus,
    putTransferDevice,
    get_Queue,
    insert_queue,
    search_track
 } = require('../controllers/player.controller');

router.get('/online', getOnlineStatus);
router.put('/device', putTransferDevice);
router.get('/queue', get_Queue);
router.post('/queue', insert_queue);
router.post('/search', search_track);
module.exports = router;