const ApolloServer = require('@apollo/server');
const expressMiddleware = require('@apollo/server/express4');
const ApolloServerPluginDrainHttpServer = require('@apollo/server/plugin/drainHttpServer');
const express = require('express');
const path = require('path');
const http = require('http');
const cors = require('cors');
const pkg = require('body-parser');
// import { ApolloServer } from '@apollo/server';
// import { expressMiddleware } from '@apollo/server/express4';
// import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
// import express from 'express';
// import path from 'path';
// import http from 'http';
// import cors from 'cors';
// import pkg from 'body-parser';
const { json } = pkg;

const typeDefs = require('./schema/typeDefs');
const resolvers = require('./schema/resolvers');

const PORT = 3000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// serve index.html
app.use('/', express.static(path.join(__dirname, '../client/')));

// catch-all route handler for any requests to an unknown route
app.use((req, res) => res.status(404).send('Page not found'));

const ApolloServerStart = async() => {
  //create httpServer to handle requests to Express app
  const httpServer = http.createServer(app);

  //create apollo server by passing in schema and resolver
  const server = new ApolloServer({
      typeDefs,
      resolvers,
      plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
  });

  await server.start();

  app.use(
    '/graphql',
    cors(),
    expressMiddleware(server, {
      context: async ({ req }) => ({ token: req.headers.token }),
    }),
  );

  await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
  console.log(`Server running at port: ${PORT}`);
};

// export default ApolloServerStart();