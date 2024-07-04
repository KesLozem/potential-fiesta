import { getAccessToken } from "../credentials.db";
import { getPlaylistID, getSnapshotID, setSnapshotID } from "./playlist-utls";
import axios from "axios";

export async function reorderItems(req, res) {
    let playlist_id = getPlaylistID();
    let snapshot_id = getSnapshotID();
    if (!playlist_id || playlist_id === undefined || playlist_id === "") {
        playlist_id = req.body.playlist_id;
    }
    if (!snapshot_id || snapshot_id === undefined || snapshot_id === "") {
        snapshot_id = req.body.snapshot_id;
    }
    let authOptions = {
        url: `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`,
        method: 'PUT',
        headers: { 'Authorization': 'Bearer ' + getAccessToken() },
        data: {
            "range_start": req.body.range_start,
            "range_length": req.body.range_length,
            "insert_before": req.body.insert_before,
            "snapshot_id": snapshot_id
        },
        json: true
    };
    let response = axios(authOptions).then((response) => {
        setSnapshotID(response.data.snapshot_id);
        return response.data;
    }).catch((error) => {
        console.log(`ERROR_AXIOS_REQUEST_reorderItems: ${error.code} ${error.message}`);
        throw error;
    });
    return response;
}
