const express = require('express');
const router = express.Router();

const profileRoutes = require('./routes/profile')

//TODO: remove data from req.session and request from sqlite db using sessionID

router.post('/login', express.json(), function (req, res, next) {
    req.session.regenerate(function (err) {
        if (err) next(err)
        //save username to session
        req.session.username = req.body.username
        req.session.save(function (err) {
            if (err) return next(err)
            res.json({ status: 'username ok' })
        })
    })
});

router.get('/logout', function (req, res, next) {
    req.session.username = null
    req.session.save(function (err) {
        if (err) next(err)
        if (err) next(err)
        res.redirect('/')
    })
})

router.use('/profile', profileRoutes)


module.exports = router;