import { config as dotenvConfig } from "dotenv";

dotenvConfig();

import express from "express";
import { ApolloServer } from "apollo-server-express";
import { makeExecutableSchema } from "@graphql-tools/schema";

import config from "./config";

import { syncDatabase } from "./db";

import typeDefs from "./graphql/typeDefs";
import resolvers from "./graphql/resolvers";
import directiveResolvers from "./graphql/resolvers/directives";

import { getUserId } from "./utils";

const app = express();

app.get("/api", (_, res) => {
  res.send({
    message: "Your API is online!",
  });
});

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

server.applyMiddleware({ app, path: "/graphql" });

syncDatabase();

app.listen(config.app.port, () =>
  console.log(`Server is running on port ${config.app.port}`)
);
