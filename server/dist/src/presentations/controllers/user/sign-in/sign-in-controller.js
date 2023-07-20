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
exports.SignInController = void 0;
const sign_in_controller_protocols_1 = require("../sign-in/sign-in-controller-protocols");
class SignInController {
    constructor(validation, authentication) {
        this.validation = validation;
        this.authentication = authentication;
    }
    handle(request) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const error = this.validation.validate(request.body);
                if (error)
                    return (0, sign_in_controller_protocols_1.badRequest)(error);
                const { email, password } = request.body;
                const user = yield this.authentication.auth({ email, password });
                if (!user)
                    return (0, sign_in_controller_protocols_1.unauthorized)();
                return (0, sign_in_controller_protocols_1.ok)({ user });
            }
            catch (e) {
                return (0, sign_in_controller_protocols_1.serverError)(e);
            }
        });
    }
}
exports.SignInController = SignInController;
