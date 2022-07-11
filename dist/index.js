"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const core_1 = require("@mikro-orm/core");
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const constants_1 = require("./constants");
const mikro_orm_config_1 = __importDefault(require("./mikro-orm.config"));
const PostResolver_1 = require("./resolvers/PostResolver");
const UserResolver_1 = require("./resolvers/UserResolver");
const main = async () => {
    const orm = await core_1.MikroORM.init(mikro_orm_config_1.default);
    await orm.getMigrator().up();
    const app = (0, express_1.default)();
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: await (0, type_graphql_1.buildSchema)({
            resolvers: [PostResolver_1.PostResolver, UserResolver_1.UserResolver],
            validate: false,
        }),
        context: () => ({ em: orm.em }),
    });
    await apolloServer.start();
    await apolloServer.applyMiddleware({ app });
    app.listen(constants_1.__port, () => {
        console.log(`Listening on port ${constants_1.__port}`);
    });
};
main().catch((err) => console.error(err));
//# sourceMappingURL=index.js.map