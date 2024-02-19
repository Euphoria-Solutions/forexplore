import { mapValues } from 'lodash';

export const resolversObjects = {
  Query: {
    helloQuery: () => 'Hello Query',
  },
  Mutation: {
    helloMutation: () => 'Hello Mutation',
  },
};

export const allResolvers = mapValues(resolversObjects, entries =>
  mapValues(entries)
);
