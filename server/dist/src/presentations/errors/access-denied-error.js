"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessDeniedError = void 0;
class AccessDeniedError extends Error {
    constructor() {
        super("Access denied");
        this.name = "AccessDeniedError";
    }
}
exports.AccessDeniedError = AccessDeniedError;
