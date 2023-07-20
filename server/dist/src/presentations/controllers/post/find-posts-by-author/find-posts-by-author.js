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
exports.FindPostsByAuthorController = void 0;
const find_posts_by_author_protocols_1 = require("./find-posts-by-author-protocols");
class FindPostsByAuthorController {
    constructor(validation, findPostsByAuthorUseCase) {
        this.validation = validation;
        this.findPostsByAuthorUseCase = findPostsByAuthorUseCase;
    }
    handle(request) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const error = this.validation.validate(request.params);
                if (error)
                    return (0, find_posts_by_author_protocols_1.badRequest)(error);
                const { authorId } = request.params;
                const posts = yield this.findPostsByAuthorUseCase.findAllByAuthorId(authorId);
                return (0, find_posts_by_author_protocols_1.ok)(posts);
            }
            catch (e) {
                return (0, find_posts_by_author_protocols_1.serverError)(e);
            }
        });
    }
}
exports.FindPostsByAuthorController = FindPostsByAuthorController;
