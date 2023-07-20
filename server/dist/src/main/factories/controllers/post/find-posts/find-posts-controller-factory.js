"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeFindPostsController = void 0;
const find_posts_controller_1 = require("../../../../../presentations/controllers/post/find-posts/find-posts-controller");
const find_posts_factory_1 = require("../../../use-cases/post/find-posts/find-posts-factory");
const makeFindPostsController = () => {
    const findPostsUseCase = (0, find_posts_factory_1.makeFindPostsUseCase)();
    return new find_posts_controller_1.FindPostsController(findPostsUseCase);
};
exports.makeFindPostsController = makeFindPostsController;
