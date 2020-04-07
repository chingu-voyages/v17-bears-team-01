const { AuthenticationError } = require('apollo-server-express');

module.exports = isAuthenticated = req => {
  if (!req.user) {
    throw new AuthenticationError('User not authenticated');
  }
};