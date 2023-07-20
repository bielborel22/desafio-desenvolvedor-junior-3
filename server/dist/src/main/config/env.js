"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.environment = void 0;
exports.environment = {
    port: process.env.PORT || 3333,
    jwtSecret: process.env.JWT_SECRET || "secret_key",
};
