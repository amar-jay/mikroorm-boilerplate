"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.__db = exports.__port = exports.__password = exports.__user = exports.__prod = void 0;
require("dotenv/config");
exports.__prod = process.env.NODE_ENV === 'production';
exports.__user = process.env.PG_USER || 'postgres';
exports.__password = process.env.PG_PASSWD || '';
exports.__port = process.env.PORT || 8080;
exports.__db = process.env.PG_DB || 'postgres';
//# sourceMappingURL=constants.js.map