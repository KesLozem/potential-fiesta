export function isAuthenticated(req, res, next) {
    // console.log('is user', req.user)
    console.log("IS AUTHENTICATED", req.isAuthenticated())
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/api/auth/login');
}

export function isAuthorized(req, res, next) {
    if (typeof req.session.username !== 'undefined' || req.isAuthenticated()) {
        console.log('requser inside', req.session.username)
        return next();
    }
    console.log('requser outside', req.session.username)
    res.redirect('/connect');
}