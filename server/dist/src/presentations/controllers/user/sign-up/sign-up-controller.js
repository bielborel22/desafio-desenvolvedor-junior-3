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
exports.SignUpController = void 0;
const sign_up_controller_protocols_1 = require("./sign-up-controller-protocols");
class SignUpController {
    constructor(validation, createUser, authentication) {
        this.validation = validation;
        this.createUser = createUser;
        this.authentication = authentication;
    }
    handle(request) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const error = this.validation.validate(request.body);
                if (error)
                    return (0, sign_up_controller_protocols_1.badRequest)(error);
                const { email, password } = request.body;
                const createdUser = yield this.createUser.create({ email, password });
                if (!createdUser)
                    return (0, sign_up_controller_protocols_1.forbidden)(new sign_up_controller_protocols_1.ParameterAlreadyInUseError("email"));
                const user = yield this.authentication.auth({ email, password });
                return (0, sign_up_controller_protocols_1.created)({ user });
            }
            catch (e) {
                return (0, sign_up_controller_protocols_1.serverError)(e);
            }
        });
    }
}
exports.SignUpController = SignUpController;
