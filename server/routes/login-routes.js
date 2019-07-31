const router = require('express').Router();
const passport = require('passport');
const User = require('../models/User-model');

router.post('/', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) { return next(err); }
        if (!user) { 
            return res.json({
                    message: info.message
                })
        }
        req.logIn(user, async function(err) {
            if (err) { return next(err); }
            const user = await User.findById(req.user._id).populate('events')
            return res.json({
                    user: user
                })
        });
    })(req, res, next);
});

router.get('/logout', (req, res) => {
    req.logout();
    res.json({
        redirect: true,
        user: false
    })
})

module.exports = router;