const { getIsOnline } = require("../services/player/player-online.service");

export async function getOnlineStatus(req, res) {
    try {
        const status = await getIsOnline();
        return res.status(200).send(status);
    } catch (error) {
        return res.status(500).send({ error: error });
    }
}