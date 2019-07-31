const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User-model')

//serialize user to session and store in cooie
passport.serializeUser((user, done) => {
    done(null, user.id);
});

//deserialize user form session
passport.deserializeUser((id, done) => {
    User.findById(id).populate('events').then((user) => {
        done(null, user)
    })
});

passport.use(new LocalStrategy({
    usernameField: 'email',   
    passwordField: 'password'
  },
    async function (email, password, done) {
        const user = await User.findOne({ email: email });

        if (user) {
            const result = await user.validatePassword(password);
            if (result === true) {
                return done(null, user);
            } else {
                return done(null, false, { message: 'incorrect username or password' });
            }
        } else {
            return done(null, false, { message: 'incorrect username or password' })
        }
    }
));