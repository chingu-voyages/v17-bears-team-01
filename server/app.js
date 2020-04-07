const express = require('express');
const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./typedefs');
const resolvers = require('./resolvers');
const passport = require('passport');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser');

require('dotenv').config();

const port = process.env.PORT || 4000;

mongoose.connect(process.env.MONGO_DB_URI, { 
  useCreateIndex: true, 
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  useFindAndModify: true
}).then(() => console.log('Connected to database!'))
  .catch(err => console.log(err));

const server = new ApolloServer({ 
  typeDefs, 
  resolvers,
  context: ({req}) => ({
    user: req.user 
  }),
  playground: {
    settings: {
      'request.credentials': 'include',
    }
  }
});

const app = express();

app.use(
  cookieSession({
    name: 'session',
    keys: ['awesomecookiekey'],
    maxAge: 24 * 60 * 60 * 100
  })
);

// parse cookies
app.use(cookieParser());

// initalize passport
app.use(passport.initialize());
// deserialize cookie from the browser
app.use(passport.session());

require('./config/passport');

// set up cors to accept requests from client locally
app.use(
  cors({
    origin: 'http://localhost:3000', // allow to server to accept request from different origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true // allow session cookie from browser to pass through
  })
);

app.use('/auth', authRoutes);

const authCheck = (req, res, next) => {
  if (!req.user) {
    res.status(401).json({
      authenticated: false,
      message: 'user has not been authenticated'
    });
  } else {
    next();
  }
};

app.get('/', authCheck, (req, res) => {
  res.status(200).json({
    authenticated: true,
    message: 'user successfully authenticated',
    user: req.user,
    cookies: req.cookies
  });
});

server.applyMiddleware({ app });

app.listen(port, () => console.log(`Example app listening on port ${port}!`));