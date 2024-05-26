import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "graphql/documents/**/*.gql",
  documents: ["graphql/documents/**/*.gql"],
  generates: {
    "./graphql/__generated__/client/": {
      preset: "client",
      plugins: [],
      presetConfig: {
        gqlTagName: "gql",
      },
    },
    "./graphql/__generated__/server/resolvers-types.ts": {
      plugins: ["typescript", "typescript-resolvers"],
    },
  },
  ignoreNoDocuments: true,
};

export default config;