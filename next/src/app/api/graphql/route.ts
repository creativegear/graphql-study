import { readFileSync } from "fs";
import { join } from "path";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import { Resolvers } from "../../../../graphql/__generated__/server/resolvers-types";

const schemaFilePath = join(process.cwd(), "graphql/documents/schema.gql");
const typeDefs = readFileSync(schemaFilePath, "utf-8");

const resolvers: Resolvers = {
  Query: {
    tasks() {
      return [
        { 
          id: 'task:1',
          title: 'サンプルタスク'
        }
      ];
    }
  },
};

const apolloServer = new ApolloServer<Resolvers>({ typeDefs, resolvers });
const handler = startServerAndCreateNextHandler(apolloServer);

export { handler as GET, handler as POST };