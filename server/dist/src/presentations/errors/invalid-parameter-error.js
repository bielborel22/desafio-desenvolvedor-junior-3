"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidParameterError = void 0;
class InvalidParameterError extends Error {
    constructor(paramName) {
        super(`Invalid parameter: ${paramName}`);
        this.name = "InvalidParameterError";
    }
}
exports.InvalidParameterError = InvalidParameterError;
