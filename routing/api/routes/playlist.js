// ROUTE: .../API/PLAYLIST

const express = require('express');
const router = express.Router();
const {
    get_playlist,
    create_playlist,
    add_track,
    get_tracks,
    search_dedicated_playlist,
    reorder_items
} = require('../controllers/playlist.controller');

router.get('/', get_playlist);
router.post('/', create_playlist);
router.get('/track', get_tracks);
router.post('/track', add_track);
router.get('/id', search_dedicated_playlist);
router.put('/reorder', reorder_items);


module.exports = router;