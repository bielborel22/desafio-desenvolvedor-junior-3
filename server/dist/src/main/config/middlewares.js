"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupMiddlewares = void 0;
const cors_middleware_1 = require("../../presentations/middlewares/cors-middleware");
const setupMiddlewares = (app) => {
    (0, cors_middleware_1.corsMiddleware)(app);
};
exports.setupMiddlewares = setupMiddlewares;
