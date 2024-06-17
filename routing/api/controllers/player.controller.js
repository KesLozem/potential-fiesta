const { getIsOnline } = require("../services/player/player-online.service");
const { transferPlayback } = require("../services/player/transfer-playback.service");

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