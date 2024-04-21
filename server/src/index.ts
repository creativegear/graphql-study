import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import { loadSchemaSync } from '@graphql-tools/load'
import { addResolversToSchema } from '@graphql-tools/schema'
import { bookRepository } from './repository/bookRepository/index.mjs';
import { authorRepository } from './repository/authorsRepository/index.mjs';

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

// GraphQLサーバーのセットアップ￥
const schemaWithResolvers = addResolversToSchema({ schema, resolvers })
const server = new ApolloServer({
  schema: schemaWithResolvers
});

// GraphQLサーバーの起動
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 }
});

console.log(`🚀  Server ready at: ${url}`);