const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const cookieSession = require('cookie-session');
const keys = require('./config/keys');
const passport = require('passport');
const passportSetup = require('./config/passport.js');

//routes
const registerRoutes = require('./routes/register-routes');
const loginRoutes = require('./routes/login-routes');

mongoose.connect('mongodb://localhost:27017/cs-ia', {useNewUrlParser: true});

const app = express();

//TODO: add serving build directory when front-end is finished

//body parser
app.use(urlencodedParser);
app.use(bodyParser.json());

//cookies
app.use(cookieSession({
    keys: [keys.cookieKey], //to encrypt cookie
    maxAge: 24 * 60 * 60 * 1000 //how long is the cookie supposed to last
}))

//pasport
app.use(passport.initialize());
app.use(passport.session());

//router
app.use('/api/register', registerRoutes);
app.use('/api/login', loginRoutes)

app.get('/api', (req, res) => {
    //send user to front-end redux
    user = req.user || false //ir req.user is undefined send that user is false to front-end
    return res.json({
        user: user
    })
})

app.listen(5000, () => {
    console.log('listening on port 5000')
})