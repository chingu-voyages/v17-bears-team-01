const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

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
    function(accessToken, refreshToken, profile, done) {
      const userData = {
        email: profile.emails[0].value,
        name: profile.displayName,
        token: accessToken
      };
      done(null, userData);
    }
  )
);