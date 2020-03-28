const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/user');
const mongoose = require('mongoose');

// serialize the user.id to save in the cookie session
// so the browser will remember the user when login
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// deserialize the cookieUserId to user in the database
passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      done(null, user);
    })
    .catch(() => {
      done(new Error('Failed to deserialize an user'));
    });
});

require('dotenv').config();

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: `${process.env.GOOGLE_CLIENT_ID}`,
      clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
      callbackURL: 'http://localhost:4000/auth/google/callback'
    },
    async (token, tokenSecret, profile, done) => {
      // find current user in UserModel
      const currentUser = await User.findOne({
        userId: profile.id
      });
      // create new user if the database doesn't have this user
      try {
        if (!currentUser) {
          console.log('----------------', profile.id, '----------------');
          const newUser = await new User({
            _id: new mongoose.Types.ObjectId(),
            userId: profile.id,
            email: profile.emails[0].value,
            username: profile.displayName
          }).save();
          if (newUser) {
            done(null, newUser);
          }
        }
      } catch(error) {
        console.log(error);
      }
      done(null, currentUser);
    }
  )
);