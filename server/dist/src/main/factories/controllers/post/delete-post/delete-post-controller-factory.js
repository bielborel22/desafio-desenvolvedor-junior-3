"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeDeletePostController = void 0;
const delete_post_controller_1 = require("../../../../../presentations/controllers/post/delete-post/delete-post-controller");
const delete_post_factory_1 = require("../../../use-cases/post/delete-post/delete-post-factory");
const find_post_by_id_factory_1 = require("../../../use-cases/post/find-post-by-id/find-post-by-id-factory");
const delete_post_controller_validation_factory_1 = require("./delete-post-controller-validation-factory");
const makeDeletePostController = () => {
    const validation = (0, delete_post_controller_validation_factory_1.makeDeletePostValidation)();
    const findPostByIdUseCase = (0, find_post_by_id_factory_1.makeFindPostByIdUseCase)();
    const deletePostUseCase = (0, delete_post_factory_1.makeDeletePostUseCase)();
    return new delete_post_controller_1.DeletePostController(validation, findPostByIdUseCase, deletePostUseCase);
};
exports.makeDeletePostController = makeDeletePostController;
