"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const core_1 = require("@mikro-orm/core");
const constants_1 = require("./constants");
const mikro_orm_config_1 = __importDefault(require("./mikro-orm.config"));
const Post_1 = require("./entities/Post");
const main = async () => {
    const orm = await core_1.MikroORM.init(mikro_orm_config_1.default);
    await orm.getMigrator().up();
    const post = orm.em.create(Post_1.Post, { title: 'My name is Manan 🥳', updatedAt: new Date(), createdAt: new Date() }, {});
    await orm.em.persistAndFlush(post);
    const posts = await orm.em.find(Post_1.Post, {});
    console.log(posts);
    const app = (0, express_1.default)();
    app.listen(constants_1.__port, () => {
        console.log(`Listening on port ${constants_1.__port}`);
    });
};
main().catch((err) => console.error(err));
//# sourceMappingURL=index.js.map