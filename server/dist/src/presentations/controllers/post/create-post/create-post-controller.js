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
exports.CreatePostController = void 0;
const create_post_controller_protocols_1 = require("./create-post-controller-protocols");
class CreatePostController {
    constructor(validation, createPost) {
        this.validation = validation;
        this.createPost = createPost;
    }
    handle(request) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const error = this.validation.validate(request.body);
                if (error)
                    return (0, create_post_controller_protocols_1.badRequest)(error);
                const { title, content } = request.body;
                const { userId } = request;
                if (!userId)
                    return (0, create_post_controller_protocols_1.unauthorized)();
                yield this.createPost.create({ title, content, authorId: userId });
                return (0, create_post_controller_protocols_1.created)({});
            }
            catch (e) {
                return (0, create_post_controller_protocols_1.serverError)(e);
            }
        });
    }
}
exports.CreatePostController = CreatePostController;
