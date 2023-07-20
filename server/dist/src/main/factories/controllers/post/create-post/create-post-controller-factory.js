"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeCreatePostController = void 0;
const create_post_controller_1 = require("../../../../../presentations/controllers/post/create-post/create-post-controller");
const create_post_factory_1 = require("../../../use-cases/post/create-post/create-post-factory");
const create_post_controller_validation_factory_1 = require("./create-post-controller-validation-factory");
const makeCreatePostController = () => {
    const validation = (0, create_post_controller_validation_factory_1.makeCreatePostValidation)();
    const createPostUseCase = (0, create_post_factory_1.makeCreatePostUseCase)();
    return new create_post_controller_1.CreatePostController(validation, createPostUseCase);
};
exports.makeCreatePostController = makeCreatePostController;
