const { getIsOnline } = require("../services/player/player-online.service");
const { transferPlayback } = require("../services/player/transfer-playback.service");
const { getQueue } = require("../services/player/get-queue.service");

export async function getOnlineStatus(req, res) {
    try {
        const status = await getIsOnline();
        return res.status(200).send(status);
    } catch (error) {
        return res.status(500).send({ error: error });
    }
}

export async function putTransferDevice(req, res) {
    await transferPlayback(req, res).then((response) => {
        return res.status(204).send("Playback Transferred");
    }
    ).catch((error) => {
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
    });
}

export async function get_Queue(req, res) {
    try {
        const queue = await getQueue(req, res);
        return res.status(200).send(
            { 
            "queue": {
                "current": {
                    "name": queue.currently_playing.name,
                    "artist": queue.currently_playing.artists[0].name,
                    "album": queue.currently_playing.album.name,
                    "image": queue.currently_playing.album.images[0].url,
                    "uri": queue.currently_playing.id,
                    "duration": queue.currently_playing.duration_ms,
                    "popularity": queue.currently_playing.popularity
                },
                "next": queue.queue.map((track) => {
                    return {
                        "name": track.name,
                        "artist": track.artists[0].name,
                        "album": track.album.name,
                        "image": track.album.images[0].url,
                        "uri": track.id,
                        "duration": track.duration_ms,
                        "popularity": track.popularity
                    }
                })
            } 
        });
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