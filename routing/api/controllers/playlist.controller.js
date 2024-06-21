import { getPlaylist } from "../services/playlist/get-playlist.service";
import { postPlaylist } from "../services/playlist/post-newPlaylist.service";
import { setPlaylistID } from "../services/playlist/playlist-utls";

export async function get_playlist(req, res) {
    try {
        const playlist = await getPlaylist(req, res);
        return res.status(200).send({ playlist: playlist });
    } catch (error) {
        return res.status(500).send(
            {
                error: {
                    status: error.status,
                    code: error.code,
                    message: error.message,
                    request: error.config
                }
            }
        );
    }
}

export async function create_playlist(req, res) {
    try {
        const playlist = await postPlaylist(req, res);
        setPlaylistID(playlist.id);
        return res.status(201).send({ playlist: playlist });
    } catch (error) {
        return res.status(500).send(
            {
                error: {
                    status: error.status,
                    code: error.code,
                    message: error.message,
                    request: error.config
                }
            }
        );
    }
}