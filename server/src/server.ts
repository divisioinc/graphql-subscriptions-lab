import { config as dotenvConfig } from "dotenv";

dotenvConfig();

import express from "express";
import { ApolloServer } from "apollo-server-express";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { createServer } from "http";
import { execute, subscribe } from "graphql";
import { SubscriptionServer } from "subscriptions-transport-ws";

import config from "./config";

import { syncDatabase } from "./db";

import typeDefs from "./graphql/typeDefs";
import resolvers from "./graphql/resolvers";
import directiveResolvers from "./graphql/resolvers/directives";

import { getUserId } from "./utils";

(async () => {
  const app = express();

  const httpServer = createServer(app);

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
    directiveResolvers,
  });

  const server = new ApolloServer({
    schema,
    context: ({ req }) => {
      return {
        ...req,
        userId: req.headers.authorization
          ? getUserId(req.headers.authorization)
          : null,
      };
    },
  });

  await server.start();

  server.applyMiddleware({ app, path: "/graphql" });

  const subscriptionServer = SubscriptionServer.create(
    {
      schema,
      execute,
      subscribe,
    },
    {
      server: httpServer,
      path: server.graphqlPath,
    }
  );

  // Shut down in the case of interrupt and termination signals
  ["SIGINT", "SIGTERM"].forEach((signal) => {
    process.on(signal, () => subscriptionServer.close());
  });

  syncDatabase();

  httpServer.listen(config.app.port, () =>
    console.log(`Server is running on port ${config.app.port}`)
  );
})();
