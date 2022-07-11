import "reflect-metadata";
import express from "express";
import { MikroORM } from "@mikro-orm/core";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { __port } from "./constants";
import microConfig from "./mikro-orm.config";
import { PostResolver } from "./resolvers/PostResolver";
import { UserResolver } from "./resolvers/UserResolver";

const main = async () => {
  const orm = await MikroORM.init(microConfig);
  await orm.getMigrator().up();

  // const post = orm.em.create(Post, { title: 'My name is Manan 🥳', updatedAt:new Date(), createdAt:new Date() }, {})
  // await orm.em.persistAndFlush(post)

  // const posts = await orm.em.find(Post, {});
  // console.log(posts)

  const app = express();

  // Middlewares
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [PostResolver, UserResolver],
      validate: false,
    }),
    context: () => ({ em: orm.em }),
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  app.listen(__port, () => {
    console.log(`Listening on port ${__port}`);
  });
};

main().catch((err) => console.error(err));
