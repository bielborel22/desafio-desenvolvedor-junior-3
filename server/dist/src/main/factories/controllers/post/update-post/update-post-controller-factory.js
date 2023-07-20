"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeUpdatePostController = void 0;
const update_post_controller_1 = require("../../../../../presentations/controllers/post/update-post/update-post-controller");
const update_post_factory_1 = require("../../../use-cases/post/update-post/update-post-factory");
const update_post_controller_validation_factory_1 = require("./update-post-controller-validation-factory");
const makeUpdatePostController = () => {
    const updatePostUseCase = (0, update_post_factory_1.makeUpdatePostUseCase)();
    const validation = (0, update_post_controller_validation_factory_1.makeUpdatePostControllerValidation)();
    return new update_post_controller_1.UpdatePostController(validation, updatePostUseCase);
};
exports.makeUpdatePostController = makeUpdatePostController;
