import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { loadSchemaSync } from "@graphql-tools/load";
import { addResolversToSchema } from "@graphql-tools/schema";
import { join } from "path";
import { Resolvers } from "../../generated/graphql";
import { prisma } from "../../prisma";

const schema = loadSchemaSync(join(__dirname, "./schema.graphql"), {
  loaders: [new GraphQLFileLoader()],
});

const resolvers: Resolvers = {
  Query: {
    hello: () => {
      return "Hello world!";
    },
    users: async () => {
      return await prisma.user.findMany({
        select: {
          id: true,
          email: true,
        },
      });
    },
  },
  User: {
    posts: async (parent) => {
      return await prisma.post.findMany({
        where: {
          authorId: parent.id,
        },
        select: {
          title: true,
          author: true,
          pubblished: true,
        },
      });
    },
  },
};

export const schemaWithResolvers = addResolversToSchema({
  schema,
  resolvers,
});
