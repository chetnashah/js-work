var passport = require('passport');
const keys = require('./keys');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/user-model');


passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user);
    });
});

// note: GoogleStrategy requires Google+ API enabled in order to fetch profile info
passport.use(new GoogleStrategy({
    clientID: keys.google.clientId,
    clientSecret: keys.google.clientSecret,
    callbackURL: '/auth/google/redirect',
}, function(accesstoken, refreshtoken, profile, done) {// verify callback
    console.log('google strategy handler fired!!');
    console.log(profile);
    User.findOne({ googleId: profile.id }).exec((err,doc) => {
        if(err) {
            console.log('findOne err!');
            return done(err);
        } else {
            if(doc) {
                console.log('findOne doc = ', doc);
                return done(null, doc);
            } else {
                new User({
                    username: profile.displayName,
                    googleId: profile.id
                }).save().then((user) => {
                    console.log('saved to db: ', user);
                    return done(null, user);
                });
            }
        }
    });

    // must call done
    // done(null, profile);
}));