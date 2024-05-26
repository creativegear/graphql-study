"use client";

import { ApolloProvider } from "@apollo/client";
import { client } from "../../../graphql/client";

const GraphQLProvider = ({ children }: React.PropsWithChildren) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default GraphQLProvider;