import { getAccessToken } from "../credentials.db";
import axios from "axios";

export async function searchTrack(req, res) {
    let query = req.query.q;
    let authOptions = {
        url: `https://api.spotify.com/v1/search?q=${query}&type=track&limit=20`,
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + getAccessToken() },
        json: true
    };
    let response = axios(authOptions).then((response) => {
        return response.data;
    }).catch((error) => {
        console.log(`ERROR_AXIOS_REQUEST_searchTrack: ${error.code} ${error.message}`);
        throw error;
    });
    return response;
}