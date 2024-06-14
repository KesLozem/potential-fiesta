const { getAccessToken } = require("../services/credentials.db");

export async function getAuthToken(req, res) {
    try {
        const token = await getAccessToken();
        return res.status(200).send({auth_token: token});
    } catch (error) {
        return res.status(500).send({ error: error });
    }
}