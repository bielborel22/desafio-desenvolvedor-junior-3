"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeFindPostByIdController = void 0;
const find_post_by_id_controller_1 = require("../../../../../presentations/controllers/post/find-post-by-id/find-post-by-id-controller");
const find_post_by_id_factory_1 = require("../../../use-cases/post/find-post-by-id/find-post-by-id-factory");
const find_post_by_id_controller_validation_factory_1 = require("./find-post-by-id-controller-validation-factory");
const makeFindPostByIdController = () => {
    const findPostByIdUseCase = (0, find_post_by_id_factory_1.makeFindPostByIdUseCase)();
    const validation = (0, find_post_by_id_controller_validation_factory_1.makeFindPostByIdValidation)();
    return new find_post_by_id_controller_1.FindPostByIdController(validation, findPostByIdUseCase);
};
exports.makeFindPostByIdController = makeFindPostByIdController;
