const router = require('express').Router();
const passport = require('passport');

router.get('/login', (req, res) => {
    res.render('login', { user: req.user });
});

// passport take control by taking us to consent screen
router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

// google comes back here, with a auth-code in url (no profile info)
// passport middleware can take an auth-code and give us userinfo
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    // from this point on we have the authenticated
    // user in req.user
    res.redirect('/profile');
});

router.get('/logout', (req, res) => {
    // passport adds a function named logout to req
    req.logout();
    res.redirect('/');
});

module.exports = router;
