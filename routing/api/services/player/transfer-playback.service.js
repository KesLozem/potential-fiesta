import axios from "axios";
import { getAccessToken } from "../credentials.db";

export async function transferPlayback(req, res) {
    let device_id =[req.body.device_id];
    let authOptions = {
        url: `https://api.spotify.com/v1/me/player`,
        method: 'put',
        headers: { 'Authorization': 'Bearer ' + getAccessToken() },
        json: true,
        data: {
            device_ids: device_id,
            play: true
        }
    };
    let response = axios(authOptions).then((response) => {
        return;
    }).catch((error) => {
        console.log(`ERROR_AXIOS_REQUEST_transferPlayback: ${error.code} ${error.message}`);
        throw error;
    });

    return response;
}