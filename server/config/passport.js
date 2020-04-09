const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/user');

// serialize the user.id to save in the cookie session
// so the browser will remember the user when login
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// deserialize the cookieUserId to user in the database
passport.deserializeUser((id, done) => {
  User.findOne({
    id: id
  })
    .then(user => {
      done(null, user);
    })
    .catch(() => {
      done(new Error('Failed to deserialize an user'));
    });
});

require('dotenv').config();

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
        id: profile.id
      });
      // create new user if the database doesn't have this user
      try {
        if (!currentUser) {
          const newUser = await new User({
            id: profile.id,
            email: profile.emails[0].value,
            name: profile.displayName
          }).save();
          if (newUser) {
            return done(null, newUser);
          }
        }
      } catch(error) {
        console.log(error);
      }
      done(null, currentUser);
    }
  )
);

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: 'localhost:4000/auth/facebook/callback'
},
async (token, tokenSecret, profile, done) => {
  // find current user in UserModel
  const currentUser = await User.findOne({
    id: profile.id
  });
  // create new user if the database doesn't have this user
  try {
    if (!currentUser) {
      const newUser = await new User({
        id: profile.id,
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
));

