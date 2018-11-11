
var express = require('express');
const app = express();
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const keys = require('./config/keys');
const passport = require('passport');

// loading this files run configuration, returns nothing
const passportSetup = require('./config/passport-setup');
// setup view enginge
app.set('view engine', 'ejs');

//declare that the state storage is client side
app.use(cookieSession({
    maxAge: 60*60*1000,
    keys:[keys.cookieSecret.key]
}));

// passport uses storage mentioned above to store state of login
app.use(passport.initialize());
app.use(passport.session());// for persisted login info

// connect to mongodb
mongoose.connect(keys.mlab.connectionString, () => {
    console.log('connected to mongodb!');
});

app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);
// all views get user property to decide what to show
app.get('/', (req, res) => {
    res.render('home', { user: req.user });
});


app.listen('3000', () => {
    console.log('app listening for req at port http://localhost:3000');
});
