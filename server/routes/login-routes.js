const router = require('express').Router();
const passport = require('passport');

router.post('/', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) { return next(err); }
        if (!user) { 
            return res.json({
                    message: info.message
                })
        }
        req.logIn(user, function(err) {
            if (err) { return next(err); }
            return res.json({
                    user: req.user
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