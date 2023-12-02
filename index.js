const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const mongoose = require('mongoose');
const { SubscriptionServer } = require('subscriptions-transport-ws');
const { execute, subscribe } = require('graphql');
const { createServer } = require('http');
const { PubSub } = require('graphql-subscriptions');
const cors = require('cors');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const MONGODB = "mongodb://diksha:Alpha113.@ac-gzpeqd8-shard-00-00.zpie1go.mongodb.net:27017,ac-gzpeqd8-shard-00-01.zpie1go.mongodb.net:27017,ac-gzpeqd8-shard-00-02.zpie1go.mongodb.net:27017/?ssl=true&replicaSet=atlas-mkgko1-shard-0&authSource=admin&retryWrites=true&w=majority"; // Your MongoDB connection string

const pubsub = new PubSub();

async function startApolloServer() {
  const app = express();
  app.use(cors({ origin: '*' }));

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    cacheControl: {
      defaultMaxAge: 0,
    },
    context: ({ req, res }) => ({ req, res, pubsub }),
  });

  await server.start();

  server.applyMiddleware({ app });

  const httpServer = createServer(app);

  mongoose.connect(MONGODB, { useNewUrlParser: true })
    .then(() => {
      console.log("MongoDB Connected");

      const subscriptionServer = SubscriptionServer.create(
        {
          schema: server.schema,
          execute,
          subscribe,
        },
        {
          server: httpServer,
          path: server.graphqlPath,
        }
      );

      httpServer.listen({ port: 4000 }, () => {
        console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
      });
    })
    .catch(err => {
      console.error('Error connecting to MongoDB:', err.message);
    });
}

startApolloServer().catch(error => console.error('Error starting server:', error));
