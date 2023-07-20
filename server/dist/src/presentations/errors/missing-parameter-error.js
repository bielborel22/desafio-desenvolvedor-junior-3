"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MissingParameterError = void 0;
class MissingParameterError extends Error {
    constructor(paramName) {
        super(`Missing parameter: ${paramName}`);
        this.name = "MissingParameterError";
    }
}
exports.MissingParameterError = MissingParameterError;
