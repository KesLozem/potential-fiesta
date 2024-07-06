import { getAccessToken } from "../credentials.db";
import { getPlaylistID, setSnapshotID } from "./playlist-utls";
import axios from "axios";

export async function insertTrack(req, res) {
    let playlist_id = getPlaylistID();
    if (!playlist_id || playlist_id === undefined || playlist_id === "") {
        playlist_id = req.body.playlist_id;
    }
    let authOptions = {
        url: `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`,
        method: 'POST',
        headers: { 'Authorization': 'Bearer ' + getAccessToken() },

        data: {
            "uris": req.body.uris
        }, 
        json: true
    };
    let response = axios(authOptions).then((response) => {
        setSnapshotID(response.data.snapshot_id);
        return response.data;
    }).catch((error) => {
        console.log(`ERROR_AXIOS_REQUEST_insertTrack: ${error.code} ${error.message}`);
        throw error;
    });
    return response;
}