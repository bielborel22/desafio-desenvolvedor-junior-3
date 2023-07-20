"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const errors_1 = require("../errors");
const http_helper_1 = require("../helpers/http/http-helper");
class AuthMiddleware {
    constructor(findUserByAccessToken) {
        this.findUserByAccessToken = findUserByAccessToken;
    }
    handle(request) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const accessToken = (_a = request.headers) === null || _a === void 0 ? void 0 : _a["authorization"];
                if (!accessToken)
                    return (0, http_helper_1.forbidden)(new errors_1.AccessDeniedError());
                const account = yield this.findUserByAccessToken.findByAccessToken(accessToken);
                console.log(account);
                if (!account)
                    return (0, http_helper_1.forbidden)(new errors_1.AccessDeniedError());
                return (0, http_helper_1.ok)({ userId: account.id });
            }
            catch (error) {
                return (0, http_helper_1.serverError)(error);
            }
        });
    }
}
exports.AuthMiddleware = AuthMiddleware;
