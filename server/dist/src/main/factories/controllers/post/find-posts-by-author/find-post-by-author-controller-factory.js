"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeFindPostsByAuthorController = void 0;
const find_posts_by_author_1 = require("../../../../../presentations/controllers/post/find-posts-by-author/find-posts-by-author");
const find_post_by_author_factory_1 = require("../../../use-cases/post/find-posts-by-author/find-post-by-author-factory");
const find_post_by_author_controller_validation_factory_1 = require("./find-post-by-author-controller-validation-factory");
const makeFindPostsByAuthorController = () => {
    const findPostByIdUseCase = (0, find_post_by_author_factory_1.makeFindPostsByAuthorUseCase)();
    const validation = (0, find_post_by_author_controller_validation_factory_1.makeFindPostsByAuthorValidation)();
    return new find_posts_by_author_1.FindPostsByAuthorController(validation, findPostByIdUseCase);
};
exports.makeFindPostsByAuthorController = makeFindPostsByAuthorController;
