const { getAccessToken } = require("../credentials.db");

let online = false;

export async function getIsOnline() {
    getAccessToken() ? online = true : online = false;
    return { online: online };
}