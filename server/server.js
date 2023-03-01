import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
// import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import cors from 'cors';
import { json } from 'body-parser';
import express from 'express';
// import http from 'http';

import { typeDefs, resolvers } from './schema';

const app = express();
const PORT = 3000;
// const httpServer = http.createServer(app);

const books = [
  {
    title: 'The Awakening',
    author: 'Kate Chopin',
  }
]

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

await server.start();

app.use('/graphql', cors(), json(), expressMiddleware(server));

// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
//   plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
// });

// await server.start();

// app.use(
//   '/graphql',
//   cors(),
//   json(),
//   expressMiddleware(server, {
//     context: async ({ req }) => ({ token: req.headers.token }),
//   }),
// );

// await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
// console.log(`🚀 Server ready at http://localhost:3000/graphql`);
