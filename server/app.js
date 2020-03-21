const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const { typeDefs } = require("./typeDefs");
const { resolvers } = require("./resolvers");

const port = process.env.PORT || 4000;

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

app.listen(port, () => console.log(`Example app listening on port ${port}!`));