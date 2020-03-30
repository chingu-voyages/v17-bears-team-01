const router = require('express').Router();
const passport = require('passport');

require('dotenv').config();

// when login is successful, retrieve user info
router.get('/login/success', (req, res) => {
  if (req.user) {
    res.json({
      success: true,
      message: 'user has successfully authenticated',
      user: req.user,
      cookies: req.cookies
    });
  }
});

// when login failed, send failed msg
router.get('/login/failed', (req, res) => {
  res.status(401).json({
    success: false,
    message: 'user failed to authenticate.'
  });
});

// When logout, redirect to client
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect(process.env.CLIENT_HOME_PAGE_URL);
});

// auth with google
router.get(
  '/google',
  passport.authenticate('google', { scope: ['email', 'profile']})
);

// auth with facebook
router.get(
  '/facebook',
  passport.authenticate('facebook', { scope: ['email', 'profile']})
);

// redirect to home page after successfully login via google
router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login/failed'
  }),
  function(req, res) {
    res.redirect(process.env.CLIENT_HOME_PAGE_URL);
  }
);

// redirect to home page after successfully login via facebook
router.get(
  '/facebook/callback',
  passport.authenticate('facebook', {
    failureRedirect: '/login/failed'
  }),
  function(req, res) {
    res.redirect(process.env.CLIENT_HOME_PAGE_URL);
  }
);

module.exports = router;