import jwt from 'jsonwebtoken';
import { typeDefs } from '../../graphql/types';
import { allResolvers } from '../../resolvers';
import { buildSubgraphSchema } from '@apollo/subgraph';
import { InMemoryLRUCache } from '@apollo/utils.keyvaluecache';
import { ApolloServer } from 'apollo-server-cloud-functions';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { NextFunction, Request, Response } from 'express';
import { shield, rule, allow } from 'graphql-shield';
import { applyMiddleware } from 'graphql-middleware';

const secretKey = process.env.JWT_KEY ?? '';

const isEmailVerified = rule({ cache: 'contextual' })(async (
  _parent,
  _args,
  ctx
) => {
  try {
    const user = jwt.verify(ctx.headers._id, secretKey);

    if (typeof user === 'string') return false;
    if (!user.emailVerified) return false;

    return true;
  } catch (err) {
    return false;
  }
});

const permissions = shield(
  {
    Query: {
      '*': isEmailVerified,
    },
    Mutation: {
      '*': isEmailVerified,
      logIn: allow,
      signUp: allow,
    },
  },
  {
    fallbackRule: allow,
  }
);

const schema = applyMiddleware(
  buildSubgraphSchema({
    typeDefs: typeDefs,
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
