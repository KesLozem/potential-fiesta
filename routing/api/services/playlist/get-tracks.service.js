import { getAccessToken } from "../credentials.db";
import { getPlaylistID } from "./playlist-utls";
import axios from "axios";

export async function getTracks(req, res) {
    let playlist_id = getPlaylistID();
    let offset = 0;
    if (!playlist_id || playlist_id === undefined || playlist_id === "") {
        playlist_id = req.query.playlist_id;
    }

    if (typeof (req.query.offset) !== 'undefined') {
        offset = req.query.offset;
    } else {
        offset = 0;
    }
    let authOptions = {
        url: `https://api.spotify.com/v1/playlists/${playlist_id}/tracks?offset=${offset}&limit=50`,
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + getAccessToken() },
        json: true
    };
    let response = axios(authOptions).then((response) => {
        return response.data;
    }).catch((error) => {
        console.log(`ERROR_AXIOS_REQUEST_getTracks: ${error.code} ${error.message}`);
        throw error;
    });
    return response;
}