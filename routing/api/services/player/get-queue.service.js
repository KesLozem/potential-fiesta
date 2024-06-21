import { getAccessToken } from "../credentials.db";
import axios from "axios";

export async function getQueue(req, res) {
    let authOptions = {
        url: `https://api.spotify.com/v1/me/player/queue`,
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + getAccessToken() },
        json: true
    };
    let response = axios(authOptions).then((response) => {
        return response.data;
    }).catch((error) => {
        console.log(`ERROR_AXIOS_REQUEST_getQueue: ${error.code} ${error.message}`);
        throw error;
    });
    return response;
}