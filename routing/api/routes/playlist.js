// ROUTE: .../API/PLAYLIST

const express = require('express');
const router = express.Router();
const {
    get_playlist,
    create_playlist,
    add_track
} = require('../controllers/playlist.controller');

router.get('/', get_playlist);
router.post('/', create_playlist);
router.post('/track', add_track);


module.exports = router;