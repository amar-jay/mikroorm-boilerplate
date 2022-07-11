"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const constants_1 = require("./constants");
const Post_1 = require("./entities/Post");
const User_1 = require("./entities/User");
exports.default = {
    migrations: {
        path: path_1.default.join(__dirname, 'migrations'),
        pattern: /^[\w-]+\d+\.[t]s$/,
    },
    allowGlobalContext: true,
    type: 'postgresql',
    user: constants_1.__user,
    password: constants_1.__password,
    dbName: constants_1.__db,
    entities: [Post_1.Post, User_1.User],
    debug: true,
};
//# sourceMappingURL=mikro-orm.config.js.map