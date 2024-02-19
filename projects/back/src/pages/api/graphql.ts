import { typeDefs } from '../../graphql/types';
import { allResolvers } from '../../resolvers';
import { buildSubgraphSchema } from '@apollo/subgraph';
import { InMemoryLRUCache } from '@apollo/utils.keyvaluecache';
import { ApolloServer } from 'apollo-server-cloud-functions';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { NextFunction, Request, Response } from 'express';

const server = new ApolloServer({
  schema: buildSubgraphSchema({
    typeDefs: typeDefs,
    resolvers: allResolvers,
  }),
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

const uri = process.env.MONGODB_URL ?? '';

mongoose.connect(uri);
const connection = mongoose.connection;

connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
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
