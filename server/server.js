import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import cors from 'cors';
import http from 'http';
// import { json } from 'body-parser';
import express from 'express';

import { typeDefs }  from './schema/typeDefs.js';
import { resolvers } from './schema/resolvers.js';

const PORT = 3000;
const app = express();

// routers
import newsRouter from './routes/news.js';
app.use('/news', newsRouter);
// import artRouter from './art';
// app.use('/art', artRouter);
// import userRouter from './user';
// app.use('/user', userRouter);

app.get('/',
  (req, res) => res.sendFile(path.join(__dirname, '../build/index.html'))
);


const ApolloStart = async() => {

  const httpServer = http.createServer(app);
  
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  
  await server.start();
  
  app.use(
    '/graphql',
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => ({ token: req.headers.token }),
    }),
  );
  
  await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
  console.log(`Server ready at http://localhost:3000/graphql`);
}

export default ApolloStart();
