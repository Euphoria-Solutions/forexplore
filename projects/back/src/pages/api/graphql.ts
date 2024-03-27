import { typeDefs } from '../../graphql';
import { allResolvers } from '../../resolvers';
import { buildSubgraphSchema } from '@apollo/subgraph';
import { InMemoryLRUCache } from '@apollo/utils.keyvaluecache';
import { ApolloServer } from 'apollo-server-cloud-functions';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { NextFunction, Request, Response } from 'express';
import { shield, allow, and } from 'graphql-shield';
import { applyMiddleware } from 'graphql-middleware';
import { isEmailVerified, isUserNotBlocked } from '../../middleware';

const permissions = shield(
  {
    Query: {
      '*': and(isEmailVerified, isUserNotBlocked),
    },
    Mutation: {
      '*': and(isEmailVerified, isUserNotBlocked),
      verifyToken: allow,
      logIn: allow,
      signUp: allow,
    },
  },
  {
    fallbackError: (thrownError: unknown): Promise<Error> => {
      return Promise.resolve().then(() => {
        if (thrownError instanceof Error && thrownError.message) {
          return new Error(thrownError.message);
        }
        return new Error('An unknown error occurred');
      });
    },
  }
);

const schema = applyMiddleware(
  buildSubgraphSchema({
    typeDefs,
    resolvers: allResolvers,
  }),
  permissions
);

const server = new ApolloServer({
  schema,
  csrfPrevention: true,
  cache: new InMemoryLRUCache(),
  context: ({ req, res }: { req: Request; res: Response }) => ({
    headers: req.headers,
    req,
    res,
  }),
  introspection: true,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const uri =
  process.env[
    `MONGODB_URL_${process.env.CURRENT_ENV == 'PROD' ? 'PROD' : 'DEV'}`
  ] ?? '';

mongoose.connect(uri);
const connection = mongoose.connection;

connection.once('open', () => {
  console.log(
    `MongoDB database connection established successfully with ENVIRONMENT: ${process.env.CURRENT_ENV == 'PROD' ? 'PROD' : 'DEV'}`
  );
});

const graphqlHandler = server.createHandler();

const handler = async (req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  bodyParser.json({ limit: '50mb' })(req, res, () => {
    graphqlHandler(req, res, next);
  });
};

export default handler;
