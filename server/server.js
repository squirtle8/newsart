import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import * as dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import http from 'http';
import express from 'express';
import { typeDefs }  from './gql/typeDefs.js';
import { resolvers } from './gql/resolvers.js';

const PORT = process.env.PORT;
const app = express();

// routers
import userRouter from './rest/routes/user.js';
app.use('/user', userRouter);

//datasources
import NewsAPI from './gql/datasource/news-api.js';

app.get('/',
  (req, res) => res.sendFile(path.join(__dirname, '../build/index.html'))
);


const startServer = async() => {

  // This line of code is necessary because Apollo Server requires a custom HTTP server to be used with it, rather than relying on the default server provided by Express
  const httpServer = http.createServer(app);
  
  // typeDefs = schema, resolvers = resolver functions, ApolloServerPluginDrainHttpServer plugin is used to enable graceful server shutdown
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
      // context/contextValue is an object that contains data that is shared between all resolvers during the execution of a GraphQL query or mutation
      // a new context object is initialized for every request made
      context: async () => {
        //save internal cache from RestAPIdatasources
        const { cache } = server;
        return {
          dataSources: {
            //create a new instance of the subclasses for every context initialization and persist the cache through each instance
            newsAPI: new NewsAPI({ cache }),
          }
        }
      },
    }),
  );
  
  //start express server
  await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
  console.log(`Server ready at http://localhost:${PORT}/graphql`);
}

export default startServer();
