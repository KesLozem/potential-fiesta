import usernameService from "../services/profile/get_username.service";
import adminNameService from "../services/get_admin_name.service";

export async function getUsername(req, res) {
    try {
        const username = await usernameService(req, res);
        return res.status(200).send(username);
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: error });
    }
}

export async function getAdminName(req, res) {
    try {
        const username = await adminNameService(req, res);
        return res.status(200).send(username);
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: error });
    }
}