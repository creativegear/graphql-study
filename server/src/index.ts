import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import { loadSchemaSync } from '@graphql-tools/load'
import { addResolversToSchema } from '@graphql-tools/schema'
import { GraphQLError } from 'graphql';

const books = [
  {
    id: '1',
    title: 'The Awakening',
    authorId: '1',
  },
  {
    id: '2',
    title: 'City of Glass',
    authorId: '2',
  },
];

const authors = [
  {
    id: '1',
    name: 'Kate Chopin',
  },
  {
    id: '2',
    name: 'Paul Auster',
  },
];

const schema = loadSchemaSync('src/schema.graphql', {
  loaders: [new GraphQLFileLoader()],
})

const resolvers = {
  Query: {
    books: () => books,
    book: (parent, args, contextValue, info) => {
      return books.find((book) => book.id === args.id);
    },
    authors: () => authors,
    author: (parent, args, contextValue, info) => {
      return authors.find((author) => author.id === args.id);
    },
  },
  Book: {
    author: (parent) => {
      return authors.find((author) => author.id === parent.authorId);
    }
  },
};

const schemaWithResolvers = addResolversToSchema({ schema, resolvers })
const server = new ApolloServer({
  schema: schemaWithResolvers
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    if (true) {
      throw new GraphQLError('User is not authenticated', {
        extensions: {
          code: 'UNAUTHENTICATED',
          http: { status: 401 },
        }
      });
    }
  }
});

console.log(`🚀  Server ready at: ${url}`);