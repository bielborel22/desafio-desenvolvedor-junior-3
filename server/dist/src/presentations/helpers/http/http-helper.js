"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverError = exports.forbidden = exports.unauthorized = exports.badRequest = exports.created = exports.ok = void 0;
const unauthorized_error_1 = require("../../errors/unauthorized-error");
const ok = (data) => ({
    statusCode: 200,
    body: data,
});
exports.ok = ok;
const created = (data) => ({
    statusCode: 201,
    body: data,
});
exports.created = created;
const badRequest = (error) => ({
    statusCode: 400,
    body: error,
});
exports.badRequest = badRequest;
const unauthorized = () => ({
    statusCode: 401,
    body: new unauthorized_error_1.UnauthorizedError(),
});
exports.unauthorized = unauthorized;
const forbidden = (error) => ({
    statusCode: 403,
    body: error,
});
exports.forbidden = forbidden;
const serverError = (error) => ({
    statusCode: 500,
    body: error,
});
exports.serverError = serverError;
