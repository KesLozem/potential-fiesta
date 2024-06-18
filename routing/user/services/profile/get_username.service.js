export default async function (req, res) {
    try {
        const username = req.session.username;
        return { username: username };
    } catch (error) {
        return error;
    }
}