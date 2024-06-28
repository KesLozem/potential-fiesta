import { setPlaylistID } from "./playlist-utls";
import { getPlaylist } from "./get-playlist.service";
import { playlistName } from "./playlist-utls";
import { postPlaylist } from "./post-newPlaylist.service";

export async function searchDedicatedPlaylist(req, res) {
    try {
        let id = '';
        const playlist = await getPlaylist(req, res);
        // Cycle through all playlists
        for (let i = (playlist.offset + playlist.limit); i < playlist.total; i += playlist.limit) {
            if (i < playlist.total) {
                const nextPlaylist = await getPlaylist(req, res, i);
                playlist.items = playlist.items.concat(nextPlaylist.items);
            }
        }
        // Search for the dedicated playlist
        for (let i = 0; i < playlist.items.length; i++) {
            // console.log(`#${i+1}: ${playlist.items[i].name}`);
            if (playlist.items[i].name === playlistName) {
                setPlaylistID(playlist.items[i].id);
                console.log(`Playlist FOUND: ${playlist.items[i].id}`)
                return id = playlist.items[i].id;
            }
        }

        if (id === '') {
            console.log(`DEDICATED PLAYLIST NOT FOUND: ${playlistName}... \nCreating playlist...`);
            await postPlaylist(req, res);
        }
        return id;
        
    } catch (error) {
        console.log(`ERROR_SEARCH_DEDICATED_PLAYLIST: ${error.code} ${error.message}`);
        throw error;
    }
}