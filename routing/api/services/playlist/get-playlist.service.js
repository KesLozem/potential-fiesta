import { getAccessToken } from "../credentials.db";
import axios from "axios";

export async function getPlaylist(req, res) {
    let offset = 0;
    if (typeof(req.query.offset) !== 'undefined') {
        offset = req.query.offset;
    } else {
        offset = 0;
    }
    let authOptions = {
        url: `https://api.spotify.com/v1/me/playlists?offset=${offset}&limit=50`,
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + getAccessToken() },
        json: true
    };
    let response = axios(authOptions).then((response) => {
        return response.data;
    }).catch((error) => {
        console.log(`ERROR_AXIOS_REQUEST_getPlaylist: ${error.code} ${error.message}`);
        throw error;
    });
    return response;
}