import { getPlaylist } from "../services/playlist/get-playlist.service";

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