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
exports.UpdatePostController = void 0;
const update_post_protocols_1 = require("./update-post-protocols");
class UpdatePostController {
    constructor(validation, updatePostUseCase) {
        this.validation = validation;
        this.updatePostUseCase = updatePostUseCase;
    }
    handle(request) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const error = this.validation.validate(request.body);
                if (error)
                    return (0, update_post_protocols_1.badRequest)(error);
                const { postId } = request.params;
                const { title, content } = request.body;
                const post = yield this.updatePostUseCase.update({
                    id: postId,
                    title,
                    content,
                });
                return (0, update_post_protocols_1.ok)(post);
            }
            catch (e) {
                return (0, update_post_protocols_1.serverError)(e);
            }
        });
    }
}
exports.UpdatePostController = UpdatePostController;
