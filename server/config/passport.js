const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

//serialize user to session and store in cooie
passport.serializeUser((user, done) => {
    done(null, user.id);
});

//deserialize user form session
passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user)
    })
});

passport.use(new LocalStrategy(
    async function (username, password, done) {
        const user = await User.findOne({ username: username });

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