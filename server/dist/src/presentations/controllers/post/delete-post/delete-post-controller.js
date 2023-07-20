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
exports.DeletePostController = void 0;
const delete_post_controller_protocols_1 = require("./delete-post-controller-protocols");
class DeletePostController {
    constructor(validation, findPostByIdUseCase, deletePostUseCase) {
        this.validation = validation;
        this.findPostByIdUseCase = findPostByIdUseCase;
        this.deletePostUseCase = deletePostUseCase;
    }
    handle(request) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const error = this.validation.validate(request.params);
                if (error)
                    return (0, delete_post_controller_protocols_1.badRequest)(error);
                const { postId } = request.params;
                const post = yield this.findPostByIdUseCase.findById(postId);
                if (!post)
                    return (0, delete_post_controller_protocols_1.badRequest)(new delete_post_controller_protocols_1.InvalidParameterError("postId"));
                const postDeleted = yield this.deletePostUseCase.delete(postId);
                if (!postDeleted)
                    return (0, delete_post_controller_protocols_1.badRequest)(new delete_post_controller_protocols_1.InvalidParameterError("postId"));
                return (0, delete_post_controller_protocols_1.ok)(postDeleted);
            }
            catch (e) {
                return (0, delete_post_controller_protocols_1.serverError)(e);
            }
        });
    }
}
exports.DeletePostController = DeletePostController;
