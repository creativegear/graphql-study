import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { startStandaloneServer } from '@apollo/server/standalone';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import { loadSchemaSync } from '@graphql-tools/load'
import { addResolversToSchema } from '@graphql-tools/schema'
import { bookRepository } from './repository/bookRepository/index.mjs';
import { authorRepository } from './repository/authorsRepository/index.mjs';
import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';
import cors from 'cors';
import http from 'http';

// スキーマ定義
const schema = loadSchemaSync('src/schema.graphql', {
  loaders: [new GraphQLFileLoader()],
})

// リゾルバーの実装
const resolvers = {
  Query: { // 各Queryのリゾルバー
    books: () => bookRepository.findAllBooks(),
    book: (parent, args, contextValue, info) => {
      return bookRepository.findBookById(args.id)
    },
    authors: () => authorRepository.findAllAuthors(),
    author: (parent, args, contextValue, info) => {
      return authorRepository.findAuthorById(args.id)
    },
  },
  Mutation: { // 各Mutationのリゾルバー
    updateBook: (parent, args, contextValue, info) => {
      const {id, title} = args.input
      return bookRepository.updateBook(id, title)
    },
  },
  Book: {
    author: (parent) => { // Bookの子のAuthorを取得する処理。フィールドリゾルバー
      return authorRepository.findAuthorById(parent.authorId)
    }
  },
  Author: {
    books: (parent) => { // Authtorの子のBookを取得する処理。フィールドリゾルバー
      return bookRepository.findBooksByAuthorId(parent.id)
    }
  },
};

// GraphQLサーバーのセットアップ
const app = express();
const httpServer = http.createServer(app);
const schemaWithResolvers = addResolversToSchema({ schema, resolvers })
const server = new ApolloServer({
  schema: schemaWithResolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })], 
});

// GraphQLサーバーの起動
await server.start();

app.use(
  '/graphql',
  cors<cors.CorsRequest>({ origin: ['*'] }),
  express.json(),
  expressMiddleware(server),
);

await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));
console.log(`🚀 Server ready at http://localhost:4000/graphql`);