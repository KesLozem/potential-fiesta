import usernameService from "../services/profile/username.service";

export async function getUsername(req, res) {
    try {
        const username = await usernameService(req, res);
        return res.status(200).send(username);
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: error });
    }
}