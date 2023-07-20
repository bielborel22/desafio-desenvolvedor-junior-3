"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParameterAlreadyInUseError = void 0;
class ParameterAlreadyInUseError extends Error {
    constructor(paramName) {
        super(`the received parameter: "${paramName}" is already in use`);
        this.name = "ParameterAlreadyInUseError";
    }
}
exports.ParameterAlreadyInUseError = ParameterAlreadyInUseError;
