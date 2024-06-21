import { getAccessToken } from "../credentials.db";
import axios from "axios";

export async function insertQueue(req, res) {
    let uri = `spotify:track:${req.body.uri}`;
    let authOptions = {
        url: `https://api.spotify.com/v1/me/player/queue?uri=${uri}`,
        method: 'POST',
        headers: { 'Authorization': 'Bearer ' + getAccessToken() },
        json: true
    };
    let response = axios(authOptions).then((response) => {
        return response.data;
    }).catch((error) => {
        console.log(`ERROR_AXIOS_REQUEST_insertQueue: ${error.code} ${error.message}`);
        throw error;
    });
    return response;
}