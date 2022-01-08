import { ApolloServer } from "apollo-server-express";
import express from "express";
import next from "next";
import { parse } from "url";
import { schemaWithResolvers } from "./graphql";

async function startServer(schema) {
  const app = express();

  const graphqlServer = new ApolloServer({ schema });
  await graphqlServer.start();
  graphqlServer.applyMiddleware({
    app,
    path: "/graphql",
  });

  const dev = process.env.NODE_ENV !== "production";
  const nextApp = next({ dev });
  const nextHandler = nextApp.getRequestHandler();

  nextApp.prepare().then(() => {
    app.use((req, res) => {
      const parsedUrl = parse(req.url, true);
      nextHandler(req, res, parsedUrl);
    });

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log("Listening on  http://localhost:" + PORT);
    });
  });
}

startServer(schemaWithResolvers);
