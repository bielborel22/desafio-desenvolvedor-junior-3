"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const fastify_1 = __importDefault(require("fastify"));
const routes_1 = require("./routes");
const middlewares_1 = require("./middlewares");
exports.app = (0, fastify_1.default)({
    logger: true,
});
(0, middlewares_1.setupMiddlewares)(exports.app);
(0, routes_1.setupRoutes)(exports.app);
