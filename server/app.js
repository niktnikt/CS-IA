const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const cookieSession = require('cookie-session');
const keys = require('./config/keys');
const passport = require('passport');
const passportSetup = require('./config/passport.js');
const Event = require('./models/Event-model');
const User = require('./models/User-model');

//routes
const registerRoutes = require('./routes/register-routes');
const loginRoutes = require('./routes/login-routes');
const adminRoutes = require('./routes/admin-routes');
const bookRoutes = require('./routes/book-routes');
const profileRoutes = require('./routes/profile-routes');

mongoose.connect('mongodb://localhost:27017/cs-ia', {useNewUrlParser: true});
mongoose.set('useFindAndModify', false); //gets rid of deprecation warnings

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
app.use('/api/login', loginRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/book', bookRoutes);
app.use('/api/profile', profileRoutes);

app.get('/api', async (req, res) => {
    let user;
    if(!req.user){
        user = false
    }else{
        user = await User.findOne({_id: req.user._id}).populate('events')
    }
    //send user to front-end redux
    const events = await Event.find({}).populate('users');
    return res.json({
        user: user,
        events: events
    })
})

app.listen(5000, () => {
    console.log('listening on port 5000')
})