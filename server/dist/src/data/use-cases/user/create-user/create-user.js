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
exports.CreateUserUseCase = void 0;
class CreateUserUseCase {
    constructor(hasher, createUserRepository, findUserByEmailRepository) {
        this.hasher = hasher;
        this.createUserRepository = createUserRepository;
        this.findUserByEmailRepository = findUserByEmailRepository;
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const userExists = yield this.findUserByEmailRepository.findByEmail(data.email);
            if (!!userExists)
                return null;
            const hashedPassword = yield this.hasher.hash(data.password);
            const user = Object.assign({}, data, { password: hashedPassword });
            const createdUser = yield this.createUserRepository.create(user);
            return createdUser;
        });
    }
}
exports.CreateUserUseCase = CreateUserUseCase;
