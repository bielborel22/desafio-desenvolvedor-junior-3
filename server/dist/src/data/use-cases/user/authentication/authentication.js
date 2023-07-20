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
exports.AuthenticationUseCase = void 0;
class AuthenticationUseCase {
    constructor(findUserByEmailRepository, hashComparer, encrypter, updateAccessTokenRepository) {
        this.findUserByEmailRepository = findUserByEmailRepository;
        this.hashComparer = hashComparer;
        this.encrypter = encrypter;
        this.updateAccessTokenRepository = updateAccessTokenRepository;
    }
    auth(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.findUserByEmailRepository.findByEmail(data.email);
            if (!user)
                return null;
            const passwordMatches = yield this.hashComparer.compare(data.password, user.password);
            if (!passwordMatches)
                return null;
            const accessToken = yield this.encrypter.encrypt(user.id);
            yield this.updateAccessTokenRepository.updateAccessToken(user.id, accessToken);
            user.accessToken = accessToken;
            return user;
        });
    }
}
exports.AuthenticationUseCase = AuthenticationUseCase;
