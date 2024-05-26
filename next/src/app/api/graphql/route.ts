import { readFileSync } from "fs";
import { join } from "path";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import { Resolvers } from "../../../../apollo/__generated__/server/resolvers-types";
import { NextRequest } from "next/server";

const typeDefs = readFileSync(
  join(process.cwd(), "apollo/documents/schema.gql"),
  "utf-8"
);

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