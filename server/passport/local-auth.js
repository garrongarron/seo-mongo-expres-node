const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
});

passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    const user = await User.findOne({ 'email': email })
    if (user) {
        return done(null, false, req.flash('signupMessage', 'The Email is already Taken.'));
    }
    const user2 = await User.findOne({ 'channelname': req.body.channelname })
    // console.log('req.body', req.body)
    // console.log('user2', user2)
    if (user2) {
        return done(null, false, req.flash('signupMessage', 'The Chanel name Is taken.'));
    } else {
        const newUser = new User();
        newUser.email = email;
        newUser.channelname = req.body.channelname;
        newUser.password = newUser.encryptPassword(password);
        // console.log(newUser)
        await newUser.save();
        done(null, newUser);
    }
}));

passport.use('local-signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    const user = await User.findOne({ email: email });
    if (!user) {
        return done(null, false, req.flash('signinMessage', 'No User Found'));
    }
    if (!user.comparePassword(password)) {
        return done(null, false, req.flash('signinMessage', 'Incorrect Password'));
    }
    // console.log(user)
    return done(null, user);
}));
