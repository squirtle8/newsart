import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import cors from 'cors';
import http from 'http';
import express from 'express';
import { typeDefs }  from './gql/typeDefs.js';
import { resolvers } from './gql/resolvers.js';

const PORT = 3000;
const app = express();

// routers
import newsRouter from './rest/routes/news.js';
app.use('/news', newsRouter);
// import artRouter from './art';
// app.use('/art', artRouter);
// import userRouter from './user';
// app.use('/user', userRouter);

app.get('/',
  (req, res) => res.sendFile(path.join(__dirname, '../build/index.html'))
);


const startServer = async() => {

  const httpServer = http.createServer(app);
  
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  
  //start apollo server
  await server.start();
  
  app.use(
    '/graphql',
    cors(),
    express.json(),
    //implement apollo server as an express middleware
    expressMiddleware(server, {
      context: async ({ req }) => ({ token: req.headers.token }),
    }),
  );
  
  //start express server
  await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
  console.log(`Server ready at http://localhost:3000/graphql`);
}

export default startServer();
