import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { loadSchemaSync } from "@graphql-tools/load";
import { addResolversToSchema } from "@graphql-tools/schema";
import { join } from "path";
import { Resolvers } from "../../generated/graphql";
import { prisma } from "../../prisma";
import { getTweetForUser } from "./user";

const schema = loadSchemaSync(join(__dirname, "./schema.graphql"), {
  loaders: [new GraphQLFileLoader()],
});

const resolvers: Resolvers = {
  Query: {
    hello: () => {
      return "Hello world!";
    },
    tweets: async () => {
      const tweets = await prisma.tweet.findMany({
        include: {
          author: true,
        },
      });

      return tweets.map((tweet) => {
        return {
          ...tweet,
          date: tweet.date.toUTCString(),
          user: tweet.author,
        };
      });
    },
  },
  User: {
    tweets: async (parent) => await getTweetForUser(parent.id),
  },
};

export const schemaWithResolvers = addResolversToSchema({
  schema,
  resolvers,
});
