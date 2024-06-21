// ROUTE: .../API/PLAYLIST/

import { getAccessToken, getUserID } from "../credentials.db";
import { playlistName, playlistDescription, playlistPublic, playlistCollaborative } from "./playlist-utls";
import axios from "axios";

export async function postPlaylist(req, res){
    let authOptions = {
        url: `https://api.spotify.com/v1/users/${getUserID()}/playlists`,
        method: 'POST',
        headers: { 'Authorization': 'Bearer ' + getAccessToken() },
        json: true,
        data: {
            name: playlistName,
            description: playlistDescription,
            public: playlistPublic,
            // collaborative: playlistCollaborative
        }
    };
    let response = axios(authOptions).then((response) => {
        return response.data;
    }).catch((error) => {
        console.log(`ERROR_AXIOS_REQUEST_postPlaylist: ${error.code} ${error.message}`);
        throw error;
    });
    return response;
}